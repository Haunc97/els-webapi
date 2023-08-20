using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ELS.StudySets.Dtos;
using ELS.Vocabularies;
using System.Threading.Tasks;

namespace ELS.StudySets
{
    public interface IStudySetAppService : IAsyncCrudAppService<StudySetDto, int, PagedStudySetResultRequestDto, CreateStudySetDto, StudySetDto>
    {
        Task<ListResultDto<DropdownItemDto<int>>> GetSelectionAsync(GetStudySetSelectionRequestDto input);
    }

    public class GetStudySetSelectionRequestDto : LimitedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}