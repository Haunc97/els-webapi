using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ELS.Authorization.Roles;
using ELS.Authorization.Users;
using ELS.MultiTenancy;
using ELS.Vocabularies;

namespace ELS.EntityFrameworkCore
{
    public class ELSDbContext : AbpZeroDbContext<Tenant, Role, User, ELSDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Vocabulary> Vocabularies { get; set; }


        public ELSDbContext(DbContextOptions<ELSDbContext> options)
            : base(options)
        {
        }
    }
}
