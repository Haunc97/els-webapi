using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ELS.EntityFrameworkCore;
using ELS.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ELS.Web.Tests
{
    [DependsOn(
        typeof(ELSWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class ELSWebTestModule : AbpModule
    {
        public ELSWebTestModule(ELSEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ELSWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ELSWebMvcModule).Assembly);
        }
    }
}