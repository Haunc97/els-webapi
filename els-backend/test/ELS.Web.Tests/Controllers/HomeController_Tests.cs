using System.Threading.Tasks;
using ELS.Models.TokenAuth;
using ELS.Web.Controllers;
using Shouldly;
using Xunit;

namespace ELS.Web.Tests.Controllers
{
    public class HomeController_Tests: ELSWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}