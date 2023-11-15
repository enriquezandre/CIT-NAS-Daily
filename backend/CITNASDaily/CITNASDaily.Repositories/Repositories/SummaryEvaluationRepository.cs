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
            var tkSummary = await _context.TimekeepingSummaries
                                        .Where(r => r.NASId == summaryEvaluation.nasId && r.Semester == summaryEvaluation.Semester && r.SchoolYear == summaryEvaluation.SchoolYear)
                                        .FirstOrDefaultAsync();

            if (tkSummary == null)
            {
                return null;
            }

            if(tkSummary.Excused == 0 && tkSummary.Unexcused == 0 && tkSummary.FailedToPunch == 0
                && tkSummary.LateOver10Mins == 0 && tkSummary.LateOver45Mins == 0 && tkSummary.MakeUpDutyHours == 0)
            {
                summaryEvaluation.TimekeepingStatus = "EXCELLENT";
            }
            else if((tkSummary.Excused <= 3 && tkSummary.Excused >= 0) ||
                (tkSummary.Unexcused <= 3 && tkSummary.Unexcused >= 0) ||
                (tkSummary.FailedToPunch <= 3 && tkSummary.FailedToPunch >= 0) ||
                (tkSummary.LateOver10Mins <= 3 && tkSummary.LateOver10Mins >= 0) ||
                (tkSummary.LateOver45Mins <= 3 && tkSummary.LateOver45Mins >= 0) ||
                (tkSummary.MakeUpDutyHours <= 5 && tkSummary.MakeUpDutyHours >= 0))
            {
                summaryEvaluation.TimekeepingStatus = "GOOD";
            }
            else
            {
                summaryEvaluation.TimekeepingStatus = "POOR";
            }

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
                existingEval.UnitsAllowed = summaryEvaluation.UnitsAllowed;
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

                await _context.SaveChangesAsync();

                return existingEval;
            }

            return null;
        }

        public async Task<SummaryEvaluation?> UploadGrades(SummaryEvaluation summary, IFormFile file)
        {
            var existingEval = await _context.SummaryEvaluations
                                                .Where(se => se.nasId == summary.nasId && se.Semester == summary.Semester && se.SchoolYear == summary.SchoolYear)
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
    }
}
