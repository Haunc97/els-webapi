using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ELS.Common.Dto;
using ELS.StudySets.Dtos;
using System.Threading.Tasks;

namespace ELS.StudySets
{
    public interface IStudySetAppService : IAsyncCrudAppService<StudySetDto, int, PagedStudySetResultRequestDto, CreateStudySetDto, StudySetDto>
    {
        #region Queries
        Task<ListResultDto<DropdownItemDto<int>>> GetSelectionAsync(GetStudySetSelectionRequestDto input);
        #endregion

        #region Commands

        #endregion
    }
}