using System.ComponentModel.DataAnnotations;

namespace ELS.Vocabularies.Dtos
{
    public class GetAllVocabulariesInput
    {
        public string Term { get; set; }

        public WordClassType? Classification { get; set; }

        public VocabularyLevelType? Level { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; } = ELSConsts.VocabularyListDefaultPageSize;
    }
}