using Abp.AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ELS.Quizzes.Dto
{
    [AutoMapTo(typeof(Quiz))]
    public class CreateQuizDto
    {
        public string Title { get; set; }

        public int TotalCount { get; set; }

        public int CorrectCount { get; set; }

        public decimal Percentage { get; set; }

        public List<CreateVocabularyQuizDto> CreateVocabularyQuizzes { get; set; }
    }
}
