using Abp.Application.Services;
using ELS.StudySets.Dtos;

namespace ELS.StudySets
{
    public interface IStudySetAppService : IAsyncCrudAppService<StudySetDto, int, PagedStudySetResultRequestDto, CreateStudySetDto, StudySetDto>
    {
    }
}