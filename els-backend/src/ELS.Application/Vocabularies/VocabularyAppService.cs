using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using ELS.Authorization;
using ELS.Utils;
using ELS.Vocabularies.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    [AbpAuthorize(PermissionNames.Pages_Vocabularies)]
    public class VocabularyAppService : ELSAppServiceBase, IVocabularyAppService
    {
        private readonly IRepository<Vocabulary> _vocabularyRepository;

        public VocabularyAppService(IRepository<Vocabulary> vocabularyRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }

        #region Commands
        public async Task<VocabularyDto> CreateAsync(CreateVocabularyDto input)
        {
            //CheckCreatePermission();

            var entity = ObjectMapper.Map<Vocabulary>(input);

            await _vocabularyRepository.InsertAsync(entity);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<VocabularyDto>(entity);
        }

        public async Task<VocabularyDto> UpdateAsync(VocabularyDto input)
        {
            //CheckUpdatePermission();

            var vocabulary = await GetVocabularyByIdAsync(input.Id);

            ObjectMapper.Map(input, vocabulary);

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
                .WhereIf(input.Classification != null, FilterExpression.GetExpression<Vocabulary, WordClassType>(input.Classification, nameof(Vocabulary.Classification)))
                .WhereIf(input.Level != null, FilterExpression.GetExpression<Vocabulary, VocabularyLevelType>(input.Level, nameof(Vocabulary.Level)))
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
            return ObjectMapper.Map<VocabularyDto>(entity);
        }

        public async Task<ListResultDto<VocabularyDto>> GetRandomAsync(LimitedResultRequestDto input)
        {
            var vocabularies = await _vocabularyRepository
               .GetAll()
               .OrderBy(r => Guid.NewGuid()).Take(input.MaxResultCount)
               .ToListAsync();

            return new ListResultDto<VocabularyDto>(ObjectMapper.Map<List<VocabularyDto>>(vocabularies));
        }
        #endregion

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
    }
}