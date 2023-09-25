using Abp.Application.Services.Dto;
using ELS.Common;

namespace ELS.Vocabularies.Dtos
{
    public class GetRandomVocabularyRequestDto : LimitedResultRequestDto
    {
        public int? StudySetId { get; set; }

        public FilterProperty<WordClassType> Classification { get; set; }

        public FilterProperty<VocabularyLevelType> Level { get; set; }
    }
}
