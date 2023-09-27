using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Repositories
{
    public class RoleRepository : IRoleRepository
    {

        private readonly NASContext _context;
        public RoleRepository(NASContext context)
        {
            _context = context;
        }
        //observe transactions
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.OrderBy(r=>r.RoleId).ToListAsync();
        }
    }
}
