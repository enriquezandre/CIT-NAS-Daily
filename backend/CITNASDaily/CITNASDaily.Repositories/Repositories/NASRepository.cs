﻿using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Repositories
{
    public class NASRepository : INASRepository
    {
        private readonly NASContext _context;

        public NASRepository(NASContext context)
        {
            _context = context;
        }

        #region CreateNAS

        public async Task<NAS?> CreateNASAsync(NAS nas)
        {
            var checkStudentId = await _context.NAS.FirstOrDefaultAsync(n => n.StudentIDNo == nas.StudentIDNo);
            if(checkStudentId == null)
            {
                await _context.NAS.AddAsync(nas);
                await _context.SaveChangesAsync();
                return nas;
            }

            return null;
        }

        public async Task<NAS?> GetNASAsync(int nasId)
        {
            return await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);
        }

        public async Task<IEnumerable<NAS>?> GetAllNASAsync()
        {
            return await _context.NAS.ToListAsync();
        }

        public async Task<IEnumerable<NAS>?> GetAllNasBySYSemesterAsync(List<int> nasIdList)
        {
            var nasList = new List<NAS?>();

            foreach(var nas in nasIdList)
            {
                nasList.Add(await _context.NAS.FindAsync(nas));
            }

            return nasList;
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

        public async Task<IEnumerable<NAS?>> GetNASByOfficeIdSYSemesterAsync(int officeId, int year, Semester semester)
        {
            var nasOffice = await _context.NAS.Where(e => e.OfficeId == officeId).ToListAsync();

            var nasList = new List<NAS?>();

            foreach (var nas in nasOffice)
            {
                var findSySem = await _context.NASSchoolYears.FirstOrDefaultAsync(n => n.Semester == semester && n.Year == year && n.NASId == nas.Id);
                if(findSySem != null)
                {
                    nasList.Add(nas);
                }
            }

            return nasList;
        }

        public async Task<NAS?> GetNASByNASIdSYSemesterAsync(int nasId, int year, Semester semester)
        {
            var nas = await _context.NAS.FindAsync(nasId);

            if(nas == null)
            {
                return null;
            }

            var sysem = await _context.NASSchoolYears.Where(n => n.NASId == nasId && n.Year == year && n.Semester == semester).FirstOrDefaultAsync();

            if(sysem != null)
            {
                return nas;
            }

            return null;
        }

        public async Task<IEnumerable<NASSYSemOnly?>> GetSYSemByNASIdAsync(int nasId)
        {
            var sySemList = await _context.NASSchoolYears.Where(s => s.NASId == nasId).ToListAsync();

            var nasSySemList = sySemList.Select(sysem => new NASSYSemOnly
            {
                Year = sysem.Year,
                Semester = sysem.Semester
            }).ToList();

            return nasSySemList;
        }

        #endregion

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

                await _context.SaveChangesAsync();

                return existingNAS;
            }
            return null;
        }

        public async Task<IEnumerable<NAS>?> UpdateMultipleNASAsync(int[] nasIds, Semester semester, int year)
        {
            var nasList = new List<NAS>();

            foreach(var nasId in nasIds)
            {
                var nas = await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);
                if(nas == null)
                {
                    return null; //wont update nas if one of the id does not exist
                }
                nasList.Add(nas);
            }

            if (nasList.IsNullOrEmpty())
            {
                return null;
            }

            foreach(var nas in nasList)
            {
                var sysem = await _context.NASSchoolYears
                    .SingleOrDefaultAsync(s => s.NASId == nas.Id && s.Semester == semester && s.Year == year);

                if(sysem != null)
                {
                    return null; //error if one of nasid already is assigned to specified semester and year
                }

                var schoolyear = new NASSchoolYearSemester
                {
                    NASId = nas.Id,
                    Year = year,
                    Semester = semester
                };

                await _context.NASSchoolYears.AddAsync(schoolyear);
                await _context.SaveChangesAsync();
            }

            return nasList;
        }

        public async Task<bool> DeleteNASByIdAsync(int id)
        {
            var nasToDelete = await _context.NAS.FindAsync(id);

            if (nasToDelete == null)
            {
                return false;
            }

            var existingNASSchoolYears = await _context.NASSchoolYears
                                    .Where(schedule => schedule.NASId == id)
                                    .ToListAsync();

            if (existingNASSchoolYears.Any())
            {
                _context.NASSchoolYears.RemoveRange(existingNASSchoolYears);
            }

            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == nasToDelete.UserId);

            _context.NAS.Remove(nasToDelete);
            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
