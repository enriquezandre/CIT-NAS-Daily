using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            return null;
        }
    }
}
