using Abp.Application.Services.Dto;
using ELS.Vocabularies.Dtos;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    public interface IVocabularyAppService
    {
        #region Queries
        Task<PagedResultDto<VocabularyListDto>> GetAllAsync(PagedVocabularyResultRequestDto input);

        Task<ListResultDto<VocabularyDto>> GetRandomAsync(LimitedResultRequestDto input);

        Task<VocabularyDto> GetAsync(EntityDto<int> input);
        #endregion

        #region Commands
        Task<VocabularyDto> CreateAsync(CreateVocabularyDto input);

        Task<VocabularyDto> UpdateAsync(VocabularyDto input);
        #endregion
    }
}