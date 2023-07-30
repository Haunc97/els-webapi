using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ELS.MultiTenancy;

namespace ELS.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}
