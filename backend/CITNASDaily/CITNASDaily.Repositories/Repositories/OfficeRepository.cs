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

        public async Task<Office?> GetOfficeByNASIdAsync(int nasId)
        {
            var nas = await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);
            if (nas != null) 
            {
                return await _context.Offices.Include(n => n.NAS.Where(n => n.Id == nasId)).FirstOrDefaultAsync(o => o.Id == nas.OfficeId);
            }
            return null;
        }

        public async Task<Office?> GetOfficeBySuperiorIdAsync(int superiorId)
        {
            //return await _context.Offices.FirstOrDefaultAsync(o => o.SuperiorId == superiorId);
            var office = await _context.Offices.Include(o => o.NAS).FirstOrDefaultAsync(o => o.SuperiorId == superiorId);
            if (office == null)
            {
                return await _context.Offices.FirstOrDefaultAsync(o => o.SuperiorId == superiorId);
            }
            return office;
        }

        public async Task<IEnumerable<Office?>> GetOfficesAsync()
        {
            var office = await _context.Offices.Include(o => o.NAS).ToListAsync();
            if (office == null)
            {
                return await _context.Offices.ToListAsync();
            }
            return office;
        }
    }
}
