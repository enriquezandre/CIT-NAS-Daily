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

        public async Task<IEnumerable<DailyTimeRecord>> GetDTRsBySYSemesterAsync(int year, Semester semester, string firstName, string lastName, string middleName)
        {
            return await _context.DailyTimeRecords
                .Where(d => d.SchoolYear == year && d.Semester == semester && d.FirstName == firstName && 
                d.LastName == lastName && d.MiddleName == middleName)
                .ToListAsync();
        }

        public async Task SaveDTRs(IEnumerable<DailyTimeRecord> records)
        {
            await _context.DailyTimeRecords.AddRangeAsync(records);
            await _context.SaveChangesAsync();
        }
    }
}
