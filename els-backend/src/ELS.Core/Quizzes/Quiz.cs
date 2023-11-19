using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using ELS.VocabularyQuizzes;
using Microsoft.EntityFrameworkCore;

namespace ELS.Quizzes
{
    [Table("AppQuizzes")]
    public class Quiz : Entity, ICreationAudited, IMustHaveTenant
    {
        public string Title { get; set; }

        public int TotalCount { get; set; }

        public int CorrectCount { get; set; }

        [Precision(18, 2)]
        public decimal Percentage { get; set; }

        public DateTime CompletionTime { get; set; }

        public DateTime CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public int TenantId { get; set; }

        public ICollection<VocabularyQuiz> VocabularyQuizzes { get; private set; }

        public void AddVocabularyQuiz(int vocabularyId, string anwser, bool isCorrect)
        {
            if (this.Id > 0 && this.VocabularyQuizzes == null)
            {
                throw new ArgumentNullException(nameof(VocabularyQuizzes));
            }
            
            if (VocabularyQuizzes == null) VocabularyQuizzes = new List<VocabularyQuiz>();


            var newVocabularyQuiz = new VocabularyQuiz
            {
                VocabularyId = vocabularyId,
                Answer = anwser,
                IsCorrect = isCorrect
            };

            VocabularyQuizzes.Add(newVocabularyQuiz);
        }
    }
}
