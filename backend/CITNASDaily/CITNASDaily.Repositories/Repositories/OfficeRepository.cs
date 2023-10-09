using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Repositories
{
    public class OfficeRepository : IOfficeRepository
    {
        private readonly NASContext _context;

        public OfficeRepository(NASContext context)
        {
            _context = context;
        }
        public async Task<Office?> CreateOfficeAsync(Office office)
        {
            await _context.Offices.AddAsync(office);
            await _context.SaveChangesAsync();
            return office;
        }

        public async Task<IEnumerable<Office?>> GetOfficesAsync()
        {
            return await _context.Offices.ToListAsync();
        }
    }
}
