using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace ELS.Vocabularies.Dtos
{
    [AutoMapFrom(typeof(Vocabulary))]
    public class LeastCorrectVocabularyListStatisticDto : EntityDto
    {
        public string Term { get; set; }

        public string Definition { get; set; }

        public WordClassType Classification { get; set; }

        public decimal Percentage { get; set; }

        public int AnswerCount { get; set; }
    }
}