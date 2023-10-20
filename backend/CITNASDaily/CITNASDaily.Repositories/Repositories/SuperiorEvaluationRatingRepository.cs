﻿using CITNASDaily.Entities.Models;
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
            var existingEvaluation = await _context.SuperiorEvaluationRatings.FirstOrDefaultAsync(e => e.NASId == evaluation.NASId && e.Semester == evaluation.Semester);
            if (existingEvaluation != null)
            {
                return null; //cannot add if it exist already in the table
            }
            var tkSummary = await _context.TimekeepingSummaries.FirstOrDefaultAsync(t => t.NASId == evaluation.NASId && t.Semester == evaluation.Semester);
            if (tkSummary == null)
            {
                return null; //nas id with semester inputted do not exist in timekeeping summary
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
                evaluation.OverallRating = (float)Math.Round(overAllRating, 2);
                evaluation.Semester = tkSummary.Semester;
                evaluation.Year = tkSummary.Year;
                await _context.SuperiorEvaluationRatings.AddAsync(evaluation);
                await _context.SaveChangesAsync();
                return evaluation;
            }
            return null;
            
        }

        public async Task<SuperiorEvaluationRating?> GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync(int nasId, Semester semester)
        {
            return await _context.SuperiorEvaluationRatings.FirstOrDefaultAsync(s => s.NASId == nasId && s.Semester == semester);
        }
    }
}
