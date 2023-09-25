using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using ELS.Authorization;
using ELS.Data;
using ELS.StudySets;
using ELS.StudySets.Dtos;
using ELS.Vocabularies.Dtos;
using ELS.VocabularyStudySets;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ELS.Common;
using ELS.Common.Dto;

namespace ELS.Vocabularies
{
    [AbpAuthorize(PermissionNames.Pages_Vocabularies)]
    public class VocabularyAppService : ELSAppServiceBase, IVocabularyAppService
    {
        private readonly IDataQuery _dataQuery;
        private readonly IRepository<Vocabulary> _vocabularyRepository;
        private readonly IRepository<StudySet> _studySetRepository;
        private readonly IRepository<VocabularyStudySet> _vocabularyStudySetRepository;

        public VocabularyAppService(
            IDataQuery dataQuery,
            IRepository<Vocabulary> vocabularyRepository,
            IRepository<StudySet> studySetRepository,
            IRepository<VocabularyStudySet> vocabularyStudySetRepository)
        {
            _dataQuery = dataQuery;
            _vocabularyRepository = vocabularyRepository;
            _studySetRepository = studySetRepository;
            _vocabularyStudySetRepository = vocabularyStudySetRepository;
        }

        #region Commands
        public async Task<VocabularyDto> CreateAsync(CreateVocabularyDto input)
        {
            //CheckCreatePermission();

            var entity = ObjectMapper.Map<Vocabulary>(input);

            if (input.StudySetIds != null)
            {
                var studySets = await _studySetRepository.GetAllIncluding(s => s.VocabularyStudySets)
                    .Where(s => input.StudySetIds.Contains(s.Id))
                    .ToListAsync();

                foreach ( var studySet in studySets)
                {
                    studySet.AddVocabulary(entity);
                }
            }

            await _vocabularyRepository.InsertAsync(entity);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<VocabularyDto>(entity);
        }

        public async Task<ListResultDto<VocabularyDto>> CreateBulkAsync(List<CreateVocabularyDto> input)
        {
            var entities = new List<Vocabulary>();
            foreach (var entityDto in input)
            {
                var entity = ObjectMapper.Map<Vocabulary>(entityDto);
                if (entityDto.StudySetIds != null)
                {
                    var studySets = await _studySetRepository.GetAllIncluding(s => s.VocabularyStudySets)
                        .Where(s => entityDto.StudySetIds.Contains(s.Id))
                        .ToListAsync();

                    foreach (var studySet in studySets)
                    {
                        entity.AddStudySet(studySet);
                    }
                }
                entities.Add(entity);
            }
            await _vocabularyRepository.InsertRangeAsync(entities);

            await CurrentUnitOfWork.SaveChangesAsync();

            return new ListResultDto<VocabularyDto>(
                ObjectMapper.Map<List<VocabularyDto>>(entities));
        }

        public async Task<VocabularyDto> UpdateAsync(VocabularyDto input)
        {
            //CheckUpdatePermission();

            //var vocabulary = await GetVocabularyByIdAsync(input.Id);
            var vocabulary = await _vocabularyRepository.GetAllIncluding(v => v.VocabularyStudySets)
                .SingleOrDefaultAsync(v => v.Id == input.Id);

            ObjectMapper.Map(input, vocabulary);

            var studySetIds = input.StudySets.Select(s => s.Id).ToList();
            var studySets = await _studySetRepository.GetAllListAsync(x => studySetIds.Contains(x.Id));
            
            vocabulary.UpdateStudySets(studySets);

            await _vocabularyRepository.UpdateAsync(vocabulary);

            return ObjectMapper.Map<VocabularyDto>(vocabulary);
        }

        public async Task DeleteAsync(EntityDto<int> input)
        {
            //CheckDeletePermission();

            await _vocabularyRepository.DeleteAsync(input.Id);
        }
        #endregion

        #region Queries
        public async Task<PagedResultDto<VocabularyListDto>> GetAllAsync(PagedVocabularyResultRequestDto input)
        {
            var query = _vocabularyRepository
                .GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Term), v => v.Term.ToLower().IndexOf(input.Term.ToLower()) >= 0)
                .WhereIf(input.Classification != null, GetFilter(input.Classification, nameof(Vocabulary.Classification)))
                .WhereIf(input.Level != null, GetFilter(input.Level, nameof(Vocabulary.Level)))
                .OrderByDescending(v => v.CreationTime);

            var totalCount = await query.CountAsync();
            var vocabularies = await query.Skip(input.SkipCount).Take(input.MaxResultCount).ToListAsync();

            return new PagedResultDto<VocabularyListDto>(
                totalCount,
                ObjectMapper.Map<List<VocabularyListDto>>(vocabularies)
            );
        }

        public async Task<VocabularyDto> GetAsync(EntityDto<int> input)
        {
            var entity = await GetVocabularyByIdAsync(input.Id);
            return MapToEntityDto(entity);
        }

        public async Task<ListResultDto<VocabularyDto>> GetRandomAsync(GetRandomVocabularyRequestDto input)
        {
            var vocabularies = await _vocabularyRepository
               .GetAll()
               .WhereIf(input.StudySetId.HasValue, v => v.VocabularyStudySets.Any(s => s.StudySetId == input.StudySetId))
               .WhereIf(input.Classification != null, GetFilter(input.Classification, nameof(Vocabulary.Classification)))
               .WhereIf(input.Level != null, GetFilter(input.Level, nameof(Vocabulary.Level)))
               .OrderBy(r => Guid.NewGuid()).Take(input.MaxResultCount)
               .ToListAsync();

            return new ListResultDto<VocabularyDto>(ObjectMapper.Map<List<VocabularyDto>>(vocabularies));
        }

        public async Task<ListResultDto<DropdownItemDto<int>>> GetSelectionAsync(SearchVocabularyRequestDto input)
        {
            var vocabularies = await _vocabularyRepository
                .GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), v => v.Term.Contains(input.Keyword))
                .OrderByDescending(v => v.CreationTime)
                .Take(input.MaxResultCount)
                .ToListAsync();

            var dropdownItems = vocabularies.Select(x => new DropdownItemDto<int>(x.Term, x.Id)).ToList();
            return new ListResultDto<DropdownItemDto<int>>(dropdownItems);
        }

        [HttpGet]
        public async Task<ListResultDto<VocabularyDto>> SearchAsync(SearchVocabularyRequestDto input)
        {
            var sql = $@"
                      SELECT TOP (@resultCount)
	                    [Id],
	                    [Term],
	                    [Definition],
	                    [Classification],
	                    [Phonetics],
	                    [Level],
	                    [Description],
	                    [Example]
                    FROM 
                    (
	                    SELECT *, RANK() OVER (ORDER BY KEY_TBL.RANK DESC) AS Rank1
	                    FROM dbo.AppVocabularies
	                    INNER JOIN FREETEXTTABLE(dbo.AppVocabularies, Term, @keyword) AS KEY_TBL
	                    ON dbo.AppVocabularies.Id = KEY_TBL.[KEY]
	
                    ) cte
                    ORDER BY Rank1    
            ";

            var parameters = new List<SqlParameter>
            {
                new SqlParameter
                {
                    ParameterName = "@keyword",
                    Value = input.Keyword,
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input
                },
                new SqlParameter
                {
                    ParameterName = "@resultCount",
                    Value = input.MaxResultCount,
                    DbType = DbType.Int64,
                    Direction = ParameterDirection.Input
                }
            };

            Func<DbDataReader, IEnumerable<VocabularyDto>> mapping = (reader) =>
            {
                var vocabularies = new List<VocabularyDto>();

                while (reader.Read())
                {
                    var vocabulary = new VocabularyDto()
                    {
                        Id = (int)reader[0],
                        Term = reader[1].ToString(),
                        Definition = reader[2].ToString(),
                        Classification = (WordClassType)reader[3],
                        Phonetics = reader[4]?.ToString(),
                        Level = (VocabularyLevelType)reader[5],
                        Description = reader[6]?.ToString(),
                        Example = reader[7]?.ToString(),
                    };

                    vocabularies.Add(vocabulary);
                }

                return vocabularies;
            };

            var result = _dataQuery.GetDataBySql(sql, mapping, parameters.ToArray());

            return new ListResultDto<VocabularyDto>(result.ToList());
        }
        #endregion

        private Expression<Func<Vocabulary, bool>> GetFilter<T>(
            FilterProperty<T> filter,
            string propertyName)
        {
            return FilterExpression.GetExpression<Vocabulary, T>(filter, propertyName);
        }

        protected void CheckPermission(string permissionName)
        {
            if (!string.IsNullOrEmpty(permissionName))
            {
                PermissionChecker.Authorize(permissionName);
            }
        }

        protected Task<Vocabulary> GetVocabularyByIdAsync(int id)
        {
            return _vocabularyRepository.GetAsync(id);
        }

        protected VocabularyDto MapToEntityDto(Vocabulary vocabulary)
        {
            var vocabularyDto = ObjectMapper.Map<VocabularyDto>(vocabulary);

            var studySets = _vocabularyStudySetRepository.GetAllIncluding(x => x.StudySet)
                .Where(x => x.VocabularyId == vocabulary.Id)
                .Select(x => x.StudySet)
                .ToList();

            vocabularyDto.StudySets = ObjectMapper.Map<List<StudySetDto>>(studySets);

            return vocabularyDto;
        }
    }
}