using Abp.AutoMapper;

namespace ELS.Vocabularies.Dtos
{
    [AutoMapTo(typeof(Vocabulary))]
    public class CreateVocabularyDto
    {
        public string Term { get; set; }

        public string Definition { get; set; }

        public WordClassType Classification { get; set; }

        public string Phonetics { get; set; }

        public VocabularyLevelType Level { get; set; }

        public string Description { get; set; }

        public string Example { get; set; }
    }
}
