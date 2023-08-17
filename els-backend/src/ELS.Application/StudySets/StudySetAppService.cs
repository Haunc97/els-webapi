using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using ELS.Authorization.Users;
using ELS.StudySets.Dtos;
using ELS.Users.Dto;
using ELS.Vocabularies;
using ELS.Vocabularies.Dtos;
using ELS.VocabularyStudySets;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ELS.StudySets
{
    public class StudySetAppService : AsyncCrudAppService<StudySet, StudySetDto, int, PagedStudySetResultRequestDto, CreateStudySetDto, StudySetDto>, IStudySetAppService
    {
        private readonly IRepository<Vocabulary> _vocabularyRepository;
        private readonly IRepository<VocabularyStudySet> _vocabularyStudySetRepository;

        public StudySetAppService(
            IRepository<StudySet, int> repository,
            IRepository<Vocabulary> vocabularyRepository,
            IRepository<VocabularyStudySet> vocabularyStudySetRepository)
            : base(repository)
        {
            _vocabularyRepository = vocabularyRepository;
            _vocabularyStudySetRepository = vocabularyStudySetRepository;
        }


        public override async Task<StudySetDto> CreateAsync(CreateStudySetDto input)
        {
            CheckCreatePermission();

            var stdSet = ObjectMapper.Map<StudySet>(input);

            if (input.VocabularyIds != null)
            {
                var vocabularies = await _vocabularyRepository.GetAllListAsync(x => input.VocabularyIds.Contains(x.Id));

                foreach (var vocabulary in vocabularies)
                {
                    stdSet.AddVocabulary(vocabulary);
                }
            }

            await Repository.InsertAsync(stdSet);

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(stdSet);
        }

        public override async Task<StudySetDto> UpdateAsync(StudySetDto input)
        {
            CheckUpdatePermission();

            var stdSet = await Repository.GetAllIncluding(x => x.VocabularyStudySets)
                .SingleOrDefaultAsync(x => x.Id == input.Id);

            MapToEntity(input, stdSet);

            var vocabularyIds = input.Vocabularies.Select(x => x.Id);
            var vocabularies = await _vocabularyRepository.GetAllListAsync(x => vocabularyIds.Contains(x.Id));

            stdSet.UpdateVocabularies(vocabularies.ToArray());

            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(input);
        }

        protected override IQueryable<StudySet> CreateFilteredQuery(PagedStudySetResultRequestDto input)
        {
            return Repository.GetAllIncluding(s => s.VocabularyStudySets)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Title.Contains(input.Keyword));
        }

        protected override StudySetDto MapToEntityDto(StudySet stdSet)
        {
            var vocabularies = _vocabularyStudySetRepository.GetAllIncluding(x => x.Vocabulary)
                .Where(x => x.StudySetId == stdSet.Id)
                .Select(x => x.Vocabulary)
                .ToList();

            var studySetDto = base.MapToEntityDto(stdSet);

            studySetDto.Vocabularies = ObjectMapper.Map<List<SelectedVocabularyDto>>(vocabularies.ToArray());

            return studySetDto;
        }
    }
}
