using Abp.Application.Services.Dto;

namespace ELS.StudySets.Dtos
{
    public class GetStudySetSelectionRequestDto : LimitedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}