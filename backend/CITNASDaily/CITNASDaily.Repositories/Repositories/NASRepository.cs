using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Dtos.StudentSemesterDto;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.AspNetCore.Http;
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

        public async Task<byte[]?> UploadPhotoAsync(int nasId, IFormFile file)
        {
            var existingNas = await _context.NAS.FindAsync(nasId);

            if (file == null || file.Length == 0)
            {
                return null;
            }

            if (existingNas != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    existingNas.Image = imageData;
                    await _context.SaveChangesAsync();
                    return existingNas.Image;
                }
            }

            return null;
        }

        public async Task<NAS?> UpdateNASAsync(int nasId, NAS nas)
        {
            var existingNAS = await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);

            if (existingNAS != null)
            {
                existingNAS.OfficeId = nas.OfficeId;
                existingNAS.YearLevel = nas.YearLevel;
                existingNAS.Course = nas.Course;
                existingNAS.UnitsAllowed = nas.UnitsAllowed;

                var syDelete = _context.NASSchoolYears.Where(sy => sy.NASId == nasId);
                if (syDelete != null)
                {
                    _context.NASSchoolYears.RemoveRange(syDelete);
                }

                var semDelete = _context.NASSemesters.Where(sem => sem.NASId == nasId);
                if (semDelete != null)
                {
                    _context.NASSemesters.RemoveRange(semDelete);
                }

                await _context.SaveChangesAsync();

                return existingNAS;
            }
            return null;
        }

        public async Task<List<NASSchoolYear>?> AddSchoolYear(int nasId, List<NASSchoolYearCreateDto> data)
        {
            var addedSchoolYears = new List<NASSchoolYear>();

            foreach (var sy in data)
            {
                var schoolyear = new NASSchoolYear
                {
                    NASId = nasId,
                    Year = sy.Year
                };

                await _context.NASSchoolYears.AddAsync(schoolyear);
                addedSchoolYears.Add(schoolyear);
            }

            await _context.SaveChangesAsync();

            return addedSchoolYears;
        }

        public async Task<List<NASSemester>?> AddSemester(int nasId, List<NASSemesterCreateDto> data)
        {
            var addedSemesters = new List<NASSemester>();

            foreach (var sy in data)
            {
                var semester = new NASSemester
                {
                    NASId = nasId,
                    Semester = sy.Semester
                };

                await _context.NASSemesters.AddAsync(semester);
                addedSemesters.Add(semester);
            }

            await _context.SaveChangesAsync();

            return addedSemesters;
        }
    }
}
