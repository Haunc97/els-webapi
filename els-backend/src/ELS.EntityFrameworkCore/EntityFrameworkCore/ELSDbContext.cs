using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ELS.Authorization.Roles;
using ELS.Authorization.Users;
using ELS.MultiTenancy;
using ELS.Vocabularies;
using ELS.StudySets;
using ELS.VocabularyStudySets;

namespace ELS.EntityFrameworkCore
{
    public class ELSDbContext : AbpZeroDbContext<Tenant, Role, User, ELSDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Vocabulary> Vocabularies { get; set; }
        public DbSet<StudySet> StudySets { get; set; }
        public DbSet<VocabularyStudySet> VocabularyStudySets { get; set; }


        public ELSDbContext(DbContextOptions<ELSDbContext> options)
            : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<VocabularyStudySet>()
        //        .HasKey(v => new { v.StudySetId, v.VocabularyId });
        //}
    }
}
