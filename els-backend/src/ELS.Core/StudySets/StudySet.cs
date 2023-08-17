using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;
using ELS.Vocabularies;
using System.Collections.Generic;
using ELS.VocabularyStudySets;
using Abp.Timing;
using System.Linq;

namespace ELS.StudySets
{
    [Table("AppStudySets")]
    public class StudySet : Entity, IAudited, ISoftDelete, IMustHaveTenant
    {
        public const int MaxTitleLength = 128;

        [Required]
        [MaxLength(MaxTitleLength)]
        public string Title { get; set; }

        public string Description { get; set; }

        public StudySetTypeConfig? WordTypeConfig { get; set; }

        public VocabularyLevelType? LevelConfig { get; set; }

        public int TenantId { get; set; }

        public bool IsDeleted { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime CreationTime { get; set; }

        public long? LastModifierUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public ICollection<VocabularyStudySet> VocabularyStudySets { get; private set; }

        public StudySet()
        {
            CreationTime = Clock.Now;
        }

        public void AddVocabulary(Vocabulary vocabulary)
        {
            this.VocabularyStudySets ??= new List<VocabularyStudySet>();

            var vocabularyStudySet = new VocabularyStudySet
            {
                Vocabulary = vocabulary
            };

            this.VocabularyStudySets.Add(vocabularyStudySet);
        }

        public void UpdateVocabularies(Vocabulary[] vocabularies)
        {
            //Remove from removed vocabularies
            foreach (var vocabularyStudySet in this.VocabularyStudySets)
            {
                if (vocabularies.All(vocabulary => vocabularyStudySet.VocabularyId != vocabulary.Id))
                {
                    this.VocabularyStudySets.Remove(vocabularyStudySet);
                }
            }

            //Add to added vocabularies
            foreach (var vocabulary in vocabularies)
            {
                if (VocabularyStudySets.All(vocabularyStudySets => vocabulary.Id != vocabularyStudySets.VocabularyId))
                {
                    this.AddVocabulary(vocabulary);
                }
            }
        }
    }
}