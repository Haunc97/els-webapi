using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ELS.Authorization;
using Abp.FluentValidation;

namespace ELS
{
    [DependsOn(
        typeof(ELSCoreModule), 
        typeof(AbpAutoMapperModule),
        typeof(AbpFluentValidationModule))]
    public class ELSApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ELSAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ELSApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
