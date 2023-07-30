using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;

namespace ELS.Vocabularies.Dtos
{
    [AutoMapFrom(typeof(Vocabulary))]
    public class VocabularyListDto : EntityDto, IHasCreationTime
    {
        public string Term { get; set; }

        public string Definition { get; set; }

        public WordClassType Classification { get; set; }

        public string Phonetics { get; set; }

        public VocabularyLevelType Level { get; set; }

        public DateTime CreationTime { get; set; }
    }
}
