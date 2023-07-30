using System.Threading.Tasks;
using Abp.Application.Services;
using ELS.Authorization.Accounts.Dto;

namespace ELS.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
