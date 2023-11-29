using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Repositories
{
    public class DTRRepository : IDTRRepository
    {
        private readonly NASContext _context;

        public DTRRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DailyTimeRecord>> GetDTRByNasNameAsync(string firstName, string lastName, string middleName)
        {
            return await _context.DailyTimeRecords.Where(d => d.FirstName == firstName &&
                d.LastName == lastName && d.MiddleName == middleName).ToListAsync();
        }

        public async Task<IEnumerable<DailyTimeRecord>> GetDTRs()
        {
            return await _context.DailyTimeRecords.ToListAsync();
        }

        public async Task<IEnumerable<DailyTimeRecord>> GetDTRsBySYSemesterAsync(int year, Semester semester, string firstName, string lastName, string? middleName)
        {
            if(middleName == "")
            {
                middleName = null;
            }

            return await _context.DailyTimeRecords
                .Where(d => d.SchoolYear == year && d.Semester == semester && d.FirstName == firstName && 
                d.LastName == lastName && d.MiddleName == middleName)
                .ToListAsync();
        }

        public async Task SaveDTRs(IEnumerable<DailyTimeRecord> records)
        {
            foreach(var dtr in records)
            {
                var existingDTR = await _context.DailyTimeRecords
                    .FirstOrDefaultAsync(e => e.FirstName == dtr.FirstName && e.MiddleName == dtr.MiddleName && e.LastName == dtr.LastName 
                    && e.Date == dtr.Date && e.TimeIn == dtr.TimeIn && e.TimeOut == dtr.TimeOut && e.OvertimeIn == dtr.OvertimeIn &&
                    e.OvertimeOut == dtr.OvertimeOut && e.WorkTime == dtr.WorkTime && e.TotalWorkTime == dtr.TotalWorkTime
                    && e.Semester == dtr.Semester && e.SchoolYear == dtr.SchoolYear);
                
                if(existingDTR == null)
                {
                    await _context.DailyTimeRecords.AddAsync(dtr);
                }
            }
            await _context.SaveChangesAsync();
        }
    }
}
