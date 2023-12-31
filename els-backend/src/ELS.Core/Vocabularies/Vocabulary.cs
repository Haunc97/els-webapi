﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;
using ELS.StudySets;
using ELS.VocabularyStudySets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ELS.Vocabularies
{
    [Table("AppVocabularies")]
    public class Vocabulary : Entity, IHasCreationTime, ISoftDelete, IMustHaveTenant
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

        public DateTime CreationTime { get; set; }

        public int TenantId { get; set; }

        public bool IsDeleted { get; set; }

        public ICollection<VocabularyStudySet> VocabularyStudySets { get; private set; }

        public Vocabulary()
        {
            CreationTime = Clock.Now;
        }

        public Vocabulary(
            string term,
            string definition,
            WordClassType classification,
            VocabularyLevelType level,
            string phonetics = null,
            string description = null,
            string example = null) : this()
        {
            Term = term;
            Definition = definition;
            Classification = classification;
            Level = level;
            Phonetics = phonetics;
            Description = description;
            Example = example;
        }

        public void AddStudySet(StudySet studySet)
        {
            this.VocabularyStudySets ??= new List<VocabularyStudySet>();

            var vocabularyStudySet = new VocabularyStudySet
            {
                StudySet = studySet
            };

            this.VocabularyStudySets.Add(vocabularyStudySet);
        }

        public void UpdateStudySets(IList<StudySet> studySets)
        {
            // Remove items
            foreach (var vocStdS in this.VocabularyStudySets)
            {
                if (studySets.All(x => x.Id != vocStdS.StudySetId)) this.VocabularyStudySets.Remove(vocStdS);
                
            }

            // Add items
            foreach (var stdS in studySets)
            {
                if (VocabularyStudySets.All(x => x.StudySetId != stdS.Id)) this.AddStudySet(stdS);
            }
        }
    }
}