using CITNASDaily.Entities.Models;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Contracts
{
    public interface ISuperiorEvaluationRatingRepository
    {
        Task<SuperiorEvaluationRating?> CreateSuperiorEvaluationRatingAsync(SuperiorEvaluationRating evaluation);
        Task<SuperiorEvaluationRating?> GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync(int nasId, int semester);
    }
}
