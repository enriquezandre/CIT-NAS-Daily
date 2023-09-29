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

        public async Task<Superior> CreateSuperiorAsync(Superior superior)
        {
            await _context.Superiors.AddAsync(superior);
            await _context.SaveChangesAsync();
            return superior;
        }

        //public async Task<bool> UpdateSuperiorAsync(Superior superior)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<Superior?> GetSuperiorAsync(int superiorId)
        {
            return await _context.Superiors.FirstOrDefaultAsync(s => s.Id == superiorId);
        }

        public async Task<IEnumerable<Superior?>> GetSuperiorsAsync()
        {
            return await _context.Superiors.ToListAsync();
        }
    }
}
