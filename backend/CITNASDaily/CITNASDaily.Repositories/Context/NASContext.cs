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
		//DbSet<OAS> OAS { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // set table names as singular
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            modelBuilder.Entity<Role>().HasData(new Role { RoleId = 1, RoleName = "OAS" });

        }
    }
}
