using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ELS.Common;
using ELS.Common.Dto;
using ELS.Vocabularies.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    public interface IVocabularyAppService : IApplicationService
    {
        #region Queries
        Task<PagedResultDto<VocabularyListDto>> GetAllAsync(PagedVocabularyResultRequestDto input);

        Task<ListResultDto<VocabularyDto>> GetRandomAsync(GetRandomVocabularyRequestDto input);

        Task<ListResultDto<DropdownItemDto<int>>> GetSelectionAsync(SearchVocabularyRequestDto input);

        Task<ListResultDto<VocabularyDto>> SearchAsync(SearchVocabularyRequestDto input);

        Task<VocabularyDto> GetAsync(EntityDto<int> input);

        Task<ListResultDto<LeastCorrectVocabularyListStatisticDto>> GetLeastCorrectAsync(LimitedResultRequestDto input);

        Task<int> CountVocabulariesAsync(DateRangeType? rangeType, FilterProperty<WordClassType>? classification);
        #endregion

        #region Commands
        Task<VocabularyDto> CreateAsync(CreateVocabularyDto input);

        Task<ListResultDto<VocabularyDto>> CreateBulkAsync(List<CreateVocabularyDto> input);

        Task<VocabularyDto> UpdateAsync(VocabularyDto input);
        #endregion
    }

    public class GetVocabularySelectionRequestDto : LimitedResultRequestDto
    {
        public string Keyword { get; set; }
    }

    public enum DateRangeType
    {
        ThisWeek = 1,
        LastWeek = 2,
        ThisMonth = 3,
        LastMonth = 4
    }
}