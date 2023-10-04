using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface ISuperiorEvaluationRating
    {
        Task<SuperiorEvaluationRating?> CreateEvaluationAsync(SuperiorEvaluationRating evaluation);
    }
}
