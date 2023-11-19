using Abp.Application.Services;
using ELS.Quizzes.Dto;
using System.Threading.Tasks;

namespace ELS.Quizzes
{
    public interface IQuizAppService : IApplicationService
    {
        #region Queries
        Task<int> CountAsync();
        Task<decimal> GetAccurateStatisticAsync();
        #endregion

        #region Commands
        Task<QuizDto> CreateAsync(CreateQuizDto input);
        #endregion
    }
}
