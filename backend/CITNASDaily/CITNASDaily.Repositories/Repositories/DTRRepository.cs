using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Repositories
{
    public class DTRRepository : IDTRRepository
    {
        private readonly NASContext _context;

        public DTRRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DailyTimeRecord>> GetDTRByNasNameAsync(string nasName)
        {
            return await _context.DailyTimeRecords.Where(dtr => dtr.NasName == nasName).ToListAsync();
        }

        public async Task<IEnumerable<DailyTimeRecord>> GetDTRs()
        {
            return await _context.DailyTimeRecords.ToListAsync();
        }

        public async Task SaveDTRs(IEnumerable<DailyTimeRecord> records)
        {
            await _context.DailyTimeRecords.AddRangeAsync(records);
            await _context.SaveChangesAsync();
        }
    }
}
