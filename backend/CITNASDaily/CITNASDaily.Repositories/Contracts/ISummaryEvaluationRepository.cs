using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Repositories.Contracts
{
    public interface ISummaryEvaluationRepository
    {
        Task<SummaryEvaluation?> CreateSummaryEvaluationAsync(SummaryEvaluation summaryEvaluation);
        Task<IEnumerable<SummaryEvaluation?>> GetSummaryEvaluationsAsync();
        Task<SummaryEvaluation?> GetSummaryEvaluationByNASIdAsync(int nasId);
    }
}
