using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ELS.Controllers
{
    public abstract class ELSControllerBase: AbpController
    {
        protected ELSControllerBase()
        {
            LocalizationSourceName = ELSConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
