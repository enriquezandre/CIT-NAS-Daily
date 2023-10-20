using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Contracts
{
    public interface ISummaryEvaluationService
    {
        Task<SummaryEvaluation?> CreateSummaryEvaluationAsync(SummaryEvaluationCreateDto summaryEvaluation);
    }
}
