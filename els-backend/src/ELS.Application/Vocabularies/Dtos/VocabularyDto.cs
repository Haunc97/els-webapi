using Abp.AutoMapper;
using System;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using ELS.StudySets.Dtos;

namespace ELS.Vocabularies.Dtos
{
    [AutoMapFrom(typeof(Vocabulary))]
    [AutoMapTo(typeof(Vocabulary))]
    public class VocabularyDto : EntityDto
    {
        public string Term { get; set; }

        public string Definition { get; set; }

        public WordClassType Classification { get; set; }

        public string Phonetics { get; set; }

        public VocabularyLevelType Level { get; set; }

        public string Description { get; set; }

        public string Example { get; set; }

        public DateTime CreationTime { get; set; }

        public List<StudySetDto> StudySets { get; set; }
    }
}