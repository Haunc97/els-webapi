using Abp.Domain.Entities;
using ELS.Vocabularies;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using System;
using ELS.Quizzes;

namespace ELS.VocabularyQuizzes
{
    [Table("AppVocabularyQuizzes")]
    [PrimaryKey(nameof(QuizId), nameof(VocabularyId))]
    public class VocabularyQuiz : Entity, IHasCreationTime, IMustHaveTenant
    {
        public int QuizId { get; set; }

        public int VocabularyId { get; set; }

        public string Answer { get; set; }

        public bool IsCorrect { get; set; }

        public int TenantId { get; set; }

        public DateTime CreationTime { get; set; }

        [ForeignKey(nameof(QuizId))]
        public Quiz Quiz { get; set; }

        [ForeignKey(nameof(VocabularyId))]
        public Vocabulary Vocabulary { get; set; }

        public override bool IsTransient()
        {
            return true;
        }
    }
}