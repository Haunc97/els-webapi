using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ELS.EntityFrameworkCore
{
    public static class ELSDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ELSDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ELSDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
