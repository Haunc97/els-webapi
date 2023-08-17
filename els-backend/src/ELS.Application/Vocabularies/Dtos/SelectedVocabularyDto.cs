using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace ELS.Vocabularies.Dtos
{
    [AutoMapFrom(typeof(Vocabulary))]
    public class SelectedVocabularyDto : EntityDto
    {
        public string Term { get; set; }
    }
}