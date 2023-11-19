using Abp.Application.Services.Dto;
using ELS.Common;

namespace ELS.Vocabularies.Dtos
{
    public class GetLeastCorrectVocabularyRequestDto : LimitedResultRequestDto
    {
        public FilterProperty<WordClassType> Classification { get; set; }
    }
}
