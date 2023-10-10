using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Utils;

namespace CITNASDaily.API.Initializer
{
    public static class OASInitializer
    {
        public static WebApplication Seed(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                using var context = scope.ServiceProvider.GetRequiredService<NASContext>();
                try
                {
                    context.Database.EnsureCreated();
                    var users = context.Users.FirstOrDefault();
                    if (users is null)
                    {
                        context.Users.Add(new User
                        {
                            Username = "admin",
                            PasswordHash = PasswordManager.HashPassword("admin"),
                            Role = "OAS"
                        }); ;

                        context.SaveChanges();
                    }

                }
                catch (Exception)
                {
                    throw;
                }
                return app;
            }
        }
    }
}