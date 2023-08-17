using Abp.Application.Services.Dto;

namespace ELS.StudySets.Dtos
{
    public class PagedStudySetResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
