using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ELS.Quizzes;
using System;

namespace ELS.Quizzes.Dto
{
    [AutoMapFrom(typeof(Quiz))]
    public class QuizDto : EntityDto
    {
        public string Title { get; set; }

        public DateTime CompletionTime { get; set; }

        public DateTime CreationTime { get; set; }

        //public ICollection<VocabularyQuiz> VocabularyQuizs { get; private set; }
    }
}
