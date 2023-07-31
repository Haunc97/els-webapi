using Abp.Application.Services.Dto;

namespace ELS.Vocabularies.Dtos
{
    public class PagedVocabularyResultRequestDto : PagedResultRequestDto
    {
        public string Term { get; set; }

        public WordClassType? Classification { get; set; }

        public VocabularyLevelType? Level { get; set; }
    }
}