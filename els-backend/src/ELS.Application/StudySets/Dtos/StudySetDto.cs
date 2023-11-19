using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ELS.Models;
using ELS.Vocabularies;
using ELS.Vocabularies.Dtos;
using System;
using System.Collections.Generic;

namespace ELS.StudySets.Dtos
{
    [AutoMapFrom(typeof(StudySet))]
    [AutoMapTo(typeof(StudySet))]
    public class StudySetDto : EntityDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public StudySetTypeConfig? WordTypeConfig { get; set; }

        public VocabularyLevelType? LevelConfig { get; set; }

        public DateRangeType? DateRangeConfig { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public List<SelectedVocabularyDto> Vocabularies { get; set; }
    }
}