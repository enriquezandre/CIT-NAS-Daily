using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Repositories
{
    public class SuperiorEvaluationRatingRepository : ISuperiorEvaluationRatingRepository
    {
        private readonly NASContext _context;

        public SuperiorEvaluationRatingRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<SuperiorEvaluationRating?> CreateSuperiorEvaluationRatingAsync(SuperiorEvaluationRating evaluation)
        {
            var existingEvaluation = await _context.SuperiorEvaluationRatings
                                        .Where(r => r.NASId == evaluation.NASId && r.Semester == evaluation.Semester && r.SchoolYear == evaluation.SchoolYear)
                                        .FirstOrDefaultAsync();
            if (existingEvaluation != null)
            {
                return null; //cannot add if it exist already in the table
            }

            var tkSummary = await _context.TimekeepingSummaries
                                        .Where(r => r.NASId == evaluation.NASId && r.Semester == evaluation.Semester && r.SchoolYear == evaluation.SchoolYear)
                                        .FirstOrDefaultAsync();
            if (tkSummary == null)
            {
                return null; //nas id with semester inputted do not exist in timekeeping summary
            }

            if (evaluation.AttendanceAndPunctuality >= 0 && evaluation.AttendanceAndPunctuality <= 10
                && evaluation.QualOfWorkOutput >= 0 && evaluation.QualOfWorkOutput <= 15
                && evaluation.QuanOfWorkOutput >= 0 && evaluation.QuanOfWorkOutput <= 10
                && evaluation.AttitudeAndWorkBehaviour >= 0 && evaluation.AttitudeAndWorkBehaviour <= 25
                && evaluation.OverallAssessment >= 0 && evaluation.OverallAssessment <= 5)
            {
                //calculation for overallrating
                var overAllRating = (float)(evaluation.AttendanceAndPunctuality + evaluation.QualOfWorkOutput + evaluation.QuanOfWorkOutput
                    + evaluation.AttitudeAndWorkBehaviour + evaluation.OverallAssessment)/13;
                evaluation.OverallRating = (float)Math.Round(overAllRating, 2);
                evaluation.Semester = tkSummary.Semester;
                evaluation.SchoolYear = tkSummary.SchoolYear;
                await _context.SuperiorEvaluationRatings.AddAsync(evaluation);
                await _context.SaveChangesAsync();
                return evaluation;
            }
            return null;
            
        }

        public async Task<SuperiorEvaluationRating?> GetSuperiorEvaluationRatingByNASIdAndSemesterAndSchoolYearAsync(int nasId, Semester semester, int year)
        {
            return await _context.SuperiorEvaluationRatings.FirstOrDefaultAsync(s => s.NASId == nasId && s.Semester == semester && s.SchoolYear == year);
        }
    }
}
