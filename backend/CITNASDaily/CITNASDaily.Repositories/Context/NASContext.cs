using CITNASDaily.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CITNASDaily.Repositories.Context
{
    public class NASContext : DbContext
    {
        public NASContext(DbContextOptions <NASContext> options) : base(options) { }
        //tables sa db
        public DbSet<Role> Roles { get; set; }
		public DbSet<NAS> NAS { get; set; }
		public DbSet<Office> Offices { get; set; }
		public DbSet<Superior> Superiors { get; set; }
		public DbSet<SuperiorEvaluationRating> SuperiorEvaluationRatings { get; set; }
		public DbSet<User> Users { get; set; }
        public DbSet<ActivitiesSummary> ActivitiesSummaries { get; set; }
		public DbSet<OAS> OAS { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<PerformanceEvaluation> SummaryEvaluations { get; set; }
        public DbSet<TimekeepingSummary> TimekeepingSummaries { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

			// set table names as singular
			foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            modelBuilder.Entity<Role>().HasData(new Role { Id = 1, Name = "OAS" });

			// configuration for the office and superior relationship
			modelBuilder.Entity<Office>()
			.HasOne(o => o.Superior)
			.WithOne(s => s.Office)
			.HasForeignKey<Superior>(s => s.OfficeId)
			.OnDelete(DeleteBehavior.Cascade);

			// set fk for superior
			modelBuilder.Entity<Superior>()
			.HasOne(o => o.Office)
			.WithOne(s => s.Superior)
			.HasForeignKey<Office>(s => s.SuperiorId)
			.OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<NAS>()
            .HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.NoAction);

            // set pk for superior evaluation rating because EFC doesnt recognize it
            modelBuilder.Entity<SuperiorEvaluationRating>()
			.HasKey(rating => rating.Id);

		}
	}
}
