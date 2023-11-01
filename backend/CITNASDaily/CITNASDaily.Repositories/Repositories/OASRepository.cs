using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Repositories
{
    public class OASRepository : IOASRepository
    {
        private readonly NASContext _context;

        public OASRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<OAS?> CreateOASAsync(OAS oas)
        {
            await _context.OAS.AddAsync(oas);
            await _context.SaveChangesAsync();
            return oas;
        }

        public async Task<OAS?> GetOAS(int oasId)
        {
            return await _context.OAS
                .Include(s => s.User)
                .FirstOrDefaultAsync(c => c.Id == oasId);
        }

    }
}
