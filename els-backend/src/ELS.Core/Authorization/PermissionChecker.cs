using Abp.Authorization;
using ELS.Authorization.Roles;
using ELS.Authorization.Users;

namespace ELS.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
