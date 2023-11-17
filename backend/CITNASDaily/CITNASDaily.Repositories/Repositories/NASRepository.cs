using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace CITNASDaily.Repositories.Repositories
{
    public class NASRepository : INASRepository
    {
        private readonly NASContext _context;

        public NASRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<NAS?> CreateNASAsync(NAS nas)
        {
            await _context.NAS.AddAsync(nas);
            await _context.SaveChangesAsync();
            return nas;
        }

        public async Task<IEnumerable<NAS>?> GetAllNASAsync()
        {
            return await _context.NAS.ToListAsync();
        }

        public async Task<NAS?> GetNASAsync(int nasId)
        {
            return await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);
        }

        public async Task<IQueryable<NAS?>> GetNASByOfficeIdAsync(int officeId)
        {
            return await Task.FromResult(_context.NAS.Where(e => e.OfficeId == officeId));
        }

        public async Task<int> GetNASIdByUsernameAsync(string username)
        {
            var nas = await _context.NAS.FirstOrDefaultAsync(c => c.Username == username);
            if (nas != null)
            {
                return nas.Id;
            }
            return 0;
        }

        public async Task<NAS?> UpdateNASAsync(int nasId, NAS nas)
        {
            var existingNAS = await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);

            if (existingNAS != null)
            {
                existingNAS.OfficeId = nas.OfficeId;
                existingNAS.YearLevel = nas.YearLevel;
                existingNAS.Course = nas.Course;
                existingNAS.SchoolYears = nas.SchoolYears;
                existingNAS.Semesters = nas.Semesters;
                existingNAS.UnitsAllowed = nas.UnitsAllowed;

                foreach (var sy in existingNAS.SchoolYears)
                {
                    var schoolyear = new NASSchoolYear
                    {
                        NASId = nasId,
                        Year = sy.Year
                    };

                    await _context.NASSchoolYears.AddAsync(schoolyear);
                }
                foreach (var sem in existingNAS.Semesters)
                {
                    var semester = new NASSemester
                    {
                        NASId = nasId,
                        Semester = sem.Semester
                    };
                    await _context.NASSemesters.AddAsync(semester);
                }

                await _context.SaveChangesAsync();
                return existingNAS;
            }
            return null;
        }
    }
}
