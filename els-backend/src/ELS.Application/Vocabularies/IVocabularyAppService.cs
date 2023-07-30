using ELS.Vocabularies.Dtos;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    public interface IVocabularyAppService
    {
        Task<VocabularyListResultDto> GetAllAsync(GetAllVocabulariesInput input);
    }
}