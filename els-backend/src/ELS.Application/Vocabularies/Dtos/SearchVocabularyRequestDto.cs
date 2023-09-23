using Abp.Application.Services.Dto;

namespace ELS.Vocabularies.Dtos
{
    public class SearchVocabularyRequestDto : LimitedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
