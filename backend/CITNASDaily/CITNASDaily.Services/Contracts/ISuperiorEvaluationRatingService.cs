using CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Contracts
{
    public interface ISuperiorEvaluationRatingService
    {
        Task<SuperiorEvaluationRating?> CreateSuperiorEvaluationRatingAsync(SuperiorEvaluationRatingCreateDto SuperiorEvaluationRatingDto);
    }
}
