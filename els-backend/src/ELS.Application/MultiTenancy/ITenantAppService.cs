using Abp.Application.Services;
using ELS.MultiTenancy.Dto;

namespace ELS.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

