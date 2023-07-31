using Abp.Application.Services.Dto;
using ELS.Vocabularies.Dtos;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    public interface IVocabularyAppService
    {
        Task<PagedResultDto<VocabularyListDto>> GetAllAsync(PagedVocabularyResultRequestDto input);
    }
}