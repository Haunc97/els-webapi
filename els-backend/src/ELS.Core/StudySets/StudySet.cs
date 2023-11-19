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
using ELS.Models;

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

        public DateRangeType? DateRangeConfig { get; set; }

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

        public void UpdateVocabularies(IList<Vocabulary> vocabularies)
        {
            //Remove items
            foreach (var vocStdS in this.VocabularyStudySets)
            {
                if (vocabularies.All(x => x.Id != vocStdS.VocabularyId)) this.VocabularyStudySets.Remove(vocStdS);
            }

            //Add items
            foreach (var voc in vocabularies)
            {
                if (VocabularyStudySets.All(x => x.VocabularyId != voc.Id)) this.AddVocabulary(voc);
                
            }
        }
    }
}