using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
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
                var existingSummary = await _context.SummaryEvaluations.FirstOrDefaultAsync(s => s.nasId == summaryEvaluation.nasId && s.Semester == summaryEvaluation.Semester);
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

        public async Task<SummaryEvaluation?> GetSummaryEvaluationByNASIdAsync(int nasId)
        {
            return await _context.SummaryEvaluations.FirstOrDefaultAsync(s => s.nasId == nasId);
        }
    }
}
