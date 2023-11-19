using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using ELS.Common.Extensions;
using ELS.Models;
using ELS.Quizzes.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace ELS.Quizzes
{
    [AbpAuthorize()]
    public class QuizAppService : ApplicationService, IQuizAppService
    {
        private readonly IRepository<Quiz> _quizRepository;
        public QuizAppService(IRepository<Quiz> quizRepository)
        {
            _quizRepository = quizRepository;
        }

        #region Queries
        [HttpGet]
        public async Task<int> CountAsync()
        {
            var result = await _quizRepository.CountAsync();

            return result;
        }

        [HttpGet]
        public async Task<decimal> GetAccurateStatisticAsync()
        {
            DateRangeType? rangeType = DateRangeType.ThisWeek;
            var dateRange = rangeType.GetDateRange();

            var quizList = await _quizRepository
                .GetAllIncluding(s => s.VocabularyQuizzes)
                .WhereIf(dateRange.Item1.HasValue, v => v.CreationTime.Date >= dateRange.Item1.Value)
                .WhereIf(dateRange.Item2.HasValue, v => v.CreationTime.Date <= dateRange.Item2.Value)
                .ToListAsync();

            if (quizList == null || !quizList.Any()) return 0;

            var vocabularyQuizzes = quizList.SelectMany(x => x.VocabularyQuizzes);
            var correctCount = vocabularyQuizzes.Where(x => x.IsCorrect).Count();
            var totalCount = vocabularyQuizzes.Count();

            var result = ((decimal)correctCount / (decimal)totalCount) * 100;

            return Math.Round(result, 2, MidpointRounding.AwayFromZero);
        }
        #endregion

        #region Commands
        public async Task<QuizDto> CreateAsync(CreateQuizDto input)
        {
            var entity = ObjectMapper.Map<Quiz>(input);

            if (input.CreateVocabularyQuizzes != null)
            {
                foreach (var vocabularyQuiz in input.CreateVocabularyQuizzes)
                {
                    entity.AddVocabularyQuiz(vocabularyQuiz.VocabularyId, vocabularyQuiz.Answer, vocabularyQuiz.IsCorrect);
                }
            }

            await _quizRepository.InsertAsync(entity);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<QuizDto>(entity);
        }
        #endregion
    }
}
