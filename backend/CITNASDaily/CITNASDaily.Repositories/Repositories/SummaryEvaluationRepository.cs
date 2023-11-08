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
            var rating = summaryEvaluation.SuperiorOverallRating;
            if(rating >= 4.0 && rating <= 5.0)
            {
                summaryEvaluation.TimekeepingStatus = "EXCELLENT";
            } 
            else if(rating >= 3.0 && rating < 4.0)
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

                await _context.SaveChangesAsync();

                return existingEval;
            }

            return null;
        }

        public async Task<SummaryEvaluation?> UploadGrades(SummaryEvaluation summary)
        {
            var existingEval = await _context.SummaryEvaluations
                                                .Where(se => se.nasId == summary.nasId && se.Semester == summary.Semester && se.SchoolYear == summary.SchoolYear)
                                                .FirstOrDefaultAsync();
            if (existingEval != null)
            {
                existingEval.AcademicPerformance = summary.AcademicPerformance;

                await _context.SaveChangesAsync();

                return existingEval;
            }

            return null;
        }
    }
}
