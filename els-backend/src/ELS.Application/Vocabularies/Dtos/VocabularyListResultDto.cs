using Abp.Application.Services.Dto;
using System.Collections.Generic;

namespace ELS.Vocabularies.Dtos
{
    public class VocabularyListResultDto : ListResultDto<VocabularyListDto>
    {
        public int PageSize { get; set; }
        public int ItemTotal { get; set; }
        public int PageTotal { get; set; }

        public VocabularyListResultDto(IReadOnlyList<VocabularyListDto> items, int itemTotal, int pageSize)
            : base(items)
        {
            PageSize = pageSize;
            ItemTotal = itemTotal;
            if (itemTotal <= 0) PageTotal = 0;
            else PageTotal = ((itemTotal - 1) / pageSize) + 1;
        }
    }
}