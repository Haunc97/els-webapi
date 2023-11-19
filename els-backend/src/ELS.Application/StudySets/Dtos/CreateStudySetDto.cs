using Abp.AutoMapper;
using ELS.Models;
using ELS.Vocabularies;

namespace ELS.StudySets.Dtos
{
    [AutoMapTo(typeof(StudySet))]
    public class CreateStudySetDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public StudySetTypeConfig? WordTypeConfig { get; set; }

        public VocabularyLevelType? LevelConfig { get; set; }

        public DateRangeType? DateRangeConfig { get; set; }

        public int[] VocabularyIds { get; set; }
    }
}