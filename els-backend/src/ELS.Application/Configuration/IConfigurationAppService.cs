using System.Threading.Tasks;
using ELS.Configuration.Dto;

namespace ELS.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
