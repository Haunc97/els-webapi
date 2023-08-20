using Abp.Application.Services.Dto;
using ELS.Utils;
using ELS.Vocabularies.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    public interface IVocabularyAppService
    {
        #region Queries
        Task<PagedResultDto<VocabularyListDto>> GetAllAsync(PagedVocabularyResultRequestDto input);

        Task<ListResultDto<VocabularyDto>> GetRandomAsync(GetRandomVocabularyRequestDto input);

        Task<ListResultDto<DropdownItemDto<int>>> GetSelectionAsync(GetVocabularySelectionRequestDto input);

        Task<VocabularyDto> GetAsync(EntityDto<int> input);
        #endregion

        #region Commands
        Task<VocabularyDto> CreateAsync(CreateVocabularyDto input);

        Task<ListResultDto<VocabularyDto>> CreateBulkAsync(List<CreateVocabularyDto> input);

        Task<VocabularyDto> UpdateAsync(VocabularyDto input);
        #endregion
    }

    public class DropdownItemDto<TPrimaryKey>
    {
        public string Text { get; set; }
        public TPrimaryKey Value { get; set; }

        public DropdownItemDto(string text, TPrimaryKey value)
        {
            Text = text;
            Value = value;
        }
    }

    public class GetVocabularySelectionRequestDto : LimitedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}