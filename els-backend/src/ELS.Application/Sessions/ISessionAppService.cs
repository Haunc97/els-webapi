using System.Threading.Tasks;
using Abp.Application.Services;
using ELS.Sessions.Dto;

namespace ELS.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
