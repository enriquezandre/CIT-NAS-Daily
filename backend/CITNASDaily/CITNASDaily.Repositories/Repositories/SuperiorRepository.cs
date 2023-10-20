using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Repositories
{
    public class SuperiorRepository : ISuperiorRepository
    {

        private readonly NASContext _context;

        public SuperiorRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<Superior?> CreateSuperiorAsync(Superior superior)
        {
            await _context.Superiors.AddAsync(superior);
            await _context.SaveChangesAsync();
            return superior;
        }


        public async Task<Superior?> GetSuperiorAsync(Guid? userId, int superiorId)
        {
            return await _context.Superiors
                .Include(s => s.User)
                .FirstOrDefaultAsync(c => /*c.UserId == userId &&*/ c.Id == superiorId);
        }


        public async Task<IEnumerable<Superior?>> GetSuperiorsAsync()
        {
            return await _context.Superiors.ToListAsync();
        }

        public async Task<Superior?> GetSuperiorByUserIdAsync(Guid? userId)
        {
            try
            {
                return await _context.Superiors
                    .FirstOrDefaultAsync(s => s.UserId == userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Superior?> GetSuperiorByUsernameAsync(string username)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

                if (user == null)
                {
                    return null; // The user with the specified username does not exist
                }

                var superior = await _context.Superiors.FirstOrDefaultAsync(s => s.UserId == user.Id);

                return superior;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
