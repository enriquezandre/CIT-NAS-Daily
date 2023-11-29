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
            var existingRecords = await _context.DailyTimeRecords.AnyAsync();

            if (existingRecords)
            {
                await _context.DailyTimeRecords.ExecuteDeleteAsync();
                await _context.Database.ExecuteSqlRawAsync("DBCC CHECKIDENT('DailyTimeRecord', RESEED, 0)");
            }

            foreach (var dtr in records)
            {
                if(dtr.FirstName == null && dtr.MiddleName == null && dtr.LastName == null &&
                    dtr.Date == null && dtr.TimeIn == null && dtr.TimeOut == null &&
                    dtr.OvertimeIn == null && dtr.OvertimeOut == null && dtr.WorkTime == null
                    && dtr.TotalWorkTime == null)
                {
                    continue;
                }
                await _context.DailyTimeRecords.AddAsync(dtr);
            }

            await _context.SaveChangesAsync();
        }
    }
}
