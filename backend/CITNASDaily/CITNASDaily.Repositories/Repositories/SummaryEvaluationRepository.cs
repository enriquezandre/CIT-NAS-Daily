using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Repositories
{
    public class SummaryEvaluationRepository : ISummaryEvaluationRepository
    {
        private readonly NASContext _context;

        public SummaryEvaluationRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<SummaryEvaluation?> CreateSummaryEvaluationAsync(SummaryEvaluation summaryEvaluation)
        {
            if (Enum.IsDefined(typeof(Semester), summaryEvaluation.Semester))
            {
                var existingSummary = await _context.SummaryEvaluations.FirstOrDefaultAsync(s => s.nasId == summaryEvaluation.nasId && s.Semester == summaryEvaluation.Semester && s.SchoolYear == summaryEvaluation.SchoolYear);
                if (existingSummary == null)
                {
                    await _context.SummaryEvaluations.AddAsync(summaryEvaluation);
                    await _context.SaveChangesAsync();
                    return summaryEvaluation;
                }
                return null;
            }
            return null;
        }

        public async Task<IEnumerable<SummaryEvaluation?>> GetSummaryEvaluationsAsync()
        {
            return await _context.SummaryEvaluations.ToListAsync();
        }

        public async Task<SummaryEvaluation?> GetSummaryEvaluationByNASIdSemesterYearAsync(int nasId, Semester semester, int year)
        {
            return await _context.SummaryEvaluations.FirstOrDefaultAsync(s => s.nasId == nasId && s.Semester == semester && s.SchoolYear == year);
        }

        public async Task<SummaryEvaluation?> UpdateSummaryEvaluationAsync(SummaryEvaluation summaryEvaluation)
        {
            var existingEval = await _context.SummaryEvaluations
                                                .Where(se => se.nasId == summaryEvaluation.nasId && se.Semester == summaryEvaluation.Semester && se.SchoolYear == summaryEvaluation.SchoolYear)
                                                .FirstOrDefaultAsync();
            if(existingEval != null)
            {
                existingEval.AllCoursesPassed = summaryEvaluation.AllCoursesPassed;
                existingEval.NoOfCoursesFailed = summaryEvaluation.NoOfCoursesFailed;

                if(existingEval.AllCoursesPassed == true && (existingEval.SuperiorOverallRating >= 3 && existingEval.SuperiorOverallRating <= 5) && existingEval.TimekeepingStatus != "POOR")
                {
                    existingEval.EnrollmentAllowed = true;
                }
                else
                {
                    existingEval.EnrollmentAllowed = false;
                }

                if(existingEval.NoOfCoursesFailed > 0)
                {
                    existingEval.UnitsAllowed = existingEval.UnitsAllowed - (3 * existingEval.NoOfCoursesFailed);
                }

                await _context.SaveChangesAsync();

                return existingEval;
            }

            return null;
        }

        public async Task<SummaryEvaluation?> UploadGrades(int nasId, int year, Semester semester, IFormFile file)
        {
            var existingEval = await _context.SummaryEvaluations
                                                .Where(se => se.nasId == nasId && se.Semester == semester && se.SchoolYear == year)
                                                .FirstOrDefaultAsync();

            if (file == null || file.Length == 0)
            {
                return null;
            }

            if (existingEval != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var fileData = memoryStream.ToArray();
                    existingEval.AcademicPerformance = fileData;
                    await _context.SaveChangesAsync();
                    return existingEval;
                }
            }

            return null;
        }

        public async Task<byte[]?> GetNASGradePicture(int nasId, int year, Semester semester)
        {
            var existingEval = await _context.SummaryEvaluations
                                                .Where(se => se.nasId == nasId && se.Semester == semester && se.SchoolYear == year)
                                                .FirstOrDefaultAsync();

            return existingEval?.AcademicPerformance;
        }

        public async Task<SummaryEvaluation?> UpdateSuperiorRatingAsync(int nasId, int year, Semester semester, float rating)
        {
            var existingEval = await _context.SummaryEvaluations
                                                .Where(se => se.nasId == nasId && se.Semester == semester && se.SchoolYear == year)
                                                .FirstOrDefaultAsync();

            if(existingEval != null)
            {
                existingEval.SuperiorOverallRating = rating;
                await _context.SaveChangesAsync();
                return existingEval;
            }

            return null;
        }
    }
}
