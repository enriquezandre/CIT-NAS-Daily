using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

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
            //checks for existing nas
            var existingNAS = await _context.NAS.FirstOrDefaultAsync(e => e.Id == timekeepingSummary.NASId);
            if (existingNAS == null)
            {
                return null; //nas dont exist 
            }
            if (Enum.IsDefined(typeof(Semester), timekeepingSummary.Semester)) {
                //checks time keeping summary with the same semester already exists
                var existingSummary = await _context.TimekeepingSummaries.FirstOrDefaultAsync(s => s.NASId == timekeepingSummary.NASId && s.Semester == timekeepingSummary.Semester);
                if (existingSummary == null)
                {
                    //this part is for setting the year in TK Summary
                    if (existingNAS == null)
                    {
                        return null;
                    }
                    timekeepingSummary.Year = existingNAS.YearLevel; //SET YEAR LEVEL
                    await _context.TimekeepingSummaries.AddAsync(timekeepingSummary);
                    await _context.SaveChangesAsync();
                    return timekeepingSummary;
                }
                return null;
            }
            return null;
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
