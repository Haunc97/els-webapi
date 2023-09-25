using Abp.Application.Services.Dto;
using ELS.Common;

namespace ELS.Vocabularies.Dtos
{
    public class PagedVocabularyResultRequestDto : PagedResultRequestDto
    {
        public string Term { get; set; }

        public FilterProperty<WordClassType> Classification { get; set; }

        public FilterProperty<VocabularyLevelType> Level { get; set; }
    }
}