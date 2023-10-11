using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Repositories.Repositories
{
    public class TimekeepingSummaryRepository : ITimekeepingSummaryRepository
    {
        private readonly NASContext _context;
        public TimekeepingSummaryRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<TimekeepingSummary?> CreateTimekeepingSummaryAsync(TimekeepingSummary timekeepingSummary)
        {
            // to be checked
            //var nas = await _context.NAS.FirstOrDefaultAsync(n => n.Id == timekeepingSummary.Id);
            await _context.TimekeepingSummaries.AddAsync(timekeepingSummary);
            await _context.SaveChangesAsync();
            return timekeepingSummary;
        }

        public async Task<IEnumerable<TimekeepingSummary>?> GetAllTimekeepingSummaryAsync()
        {
            return await _context.TimekeepingSummaries.ToListAsync();
        }

        public async Task<IQueryable<TimekeepingSummary>?> GetAllTimekeepingSummaryByNASIdAsync(int nasId)
        {
            return await Task.FromResult(_context.TimekeepingSummaries.Where(e => e.NASId == nasId));
        }
    }
}
