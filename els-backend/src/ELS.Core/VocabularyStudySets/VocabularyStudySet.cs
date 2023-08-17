using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using ELS.Vocabularies;
using ELS.StudySets;
using Microsoft.EntityFrameworkCore;
using Abp.Timing;

namespace ELS.VocabularyStudySets
{
    [Table("AppVocabularyStudySets")]
    [PrimaryKey(
        nameof(StudySetId),
        nameof(VocabularyId))]
    public class VocabularyStudySet : Entity, IAudited, IMustHaveTenant
    {
        public int StudySetId { get; set; }

        public int VocabularyId { get; set; }

        public int TenantId { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime CreationTime { get; set; }

        public long? LastModifierUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        [ForeignKey(nameof(StudySetId))]
        public StudySet StudySet { get; set; }

        [ForeignKey(nameof(VocabularyId))]
        public Vocabulary Vocabulary { get; set; }

        public override bool IsTransient()
        {
            return true;
        }

        public VocabularyStudySet()
        {
            CreationTime = Clock.Now;
        }
    }
}
