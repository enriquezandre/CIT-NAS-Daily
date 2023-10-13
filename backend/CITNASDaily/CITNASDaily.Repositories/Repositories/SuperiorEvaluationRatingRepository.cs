using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

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
            var existingEvaluation = await _context.NAS.FirstOrDefaultAsync(e => e.Id == evaluation.NASId);
            Console.WriteLine("checking of exising eval");
            if (existingEvaluation == null)
            {
                return null; //cant create another eval for nas
            }
            // input should only be between 0 and 5
            if (evaluation.AttendanceAndPunctuality >= 0 && evaluation.AttendanceAndPunctuality <= 5
                && evaluation.QualOfWorkOutput >= 0 && evaluation.QualOfWorkOutput <= 5
                && evaluation.QualOfWorkInput >= 0 && evaluation.QualOfWorkInput <= 5
                && evaluation.AttitudeAndWorkBehaviour >= 0 && evaluation.AttitudeAndWorkBehaviour <= 5
                && evaluation.OverallAssessment >= 0 && evaluation.OverallAssessment <= 5)
            {
                //calculation for overallrating
                var overAllRating = (evaluation.AttendanceAndPunctuality + evaluation.QualOfWorkOutput + evaluation.QualOfWorkInput
                    + evaluation.AttitudeAndWorkBehaviour + evaluation.OverallAssessment)/5;
                var semester = await _context.TimekeepingSummaries.FirstOrDefaultAsync(e => e.NASId == evaluation.NASId);
                if (semester == null)
                {
                    return null;
                }
                evaluation.OverallRating = (float)Math.Round(overAllRating, 2);
                evaluation.Semester = semester.Semester;
                evaluation.Year = semester.Year;
                Console.WriteLine("existing eval is not null");
                await _context.SuperiorEvaluationRatings.AddAsync(evaluation);
                await _context.SaveChangesAsync();
                return evaluation;
            }
            return null;
            
        }
    }
}
