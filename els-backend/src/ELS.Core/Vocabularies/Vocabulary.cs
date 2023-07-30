using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ELS.Vocabularies
{
    [Table("AppVocabularies")]
    public class Vocabulary : Entity, IHasCreationTime
    {
        public const int MaxTermLength = 512;
        public const int MaxDefinitionLength = 512;

        [Required]
        [MaxLength(MaxTermLength)]
        public string Term { get; set; }

        [Required]
        [MaxLength(MaxDefinitionLength)]
        public string Definition { get; set; }

        public WordClassType Classification { get; set; }

        public string Phonetics { get; set; }

        public VocabularyLevelType Level { get; set; }

        public string Description { get; set; }

        public string Example { get; set; }

        public bool Status { get; set; }

        public DateTime CreationTime { get; set; }

        public Vocabulary()
        {
            CreationTime = Clock.Now;
            Status = true;
        }

        public Vocabulary(string term, string definition, WordClassType classification, VocabularyLevelType level, string phonetics = null, string description = null, string example = null)
            : this()
        {
            Term = term;
            Definition = definition;
            Classification = classification;
            Level = level;
            Phonetics = phonetics;
            Description = description;
            Example = example;
        }
    }
}
