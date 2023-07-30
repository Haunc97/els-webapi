using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ELS.Configuration.Dto;

namespace ELS.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ELSAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
