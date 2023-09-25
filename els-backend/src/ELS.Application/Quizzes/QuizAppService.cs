using Abp.Application.Services;
using Abp.Domain.Repositories;
using ELS.Quizzes.Dto;
using System.Threading.Tasks;

namespace ELS.Quizzes
{
    public class QuizAppService : ApplicationService, IQuizAppService
    {
        private readonly IRepository<Quiz> _quizRepository;
        public QuizAppService(IRepository<Quiz> quizRepository)
        {
            _quizRepository = quizRepository;
        }

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
    }
}
