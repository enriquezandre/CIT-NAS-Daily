using AutoMapper;
using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Services.Services
{
    public class SuperiorEvaluationRatingService : ISuperiorEvaluationRatingService
    {
        public readonly ISuperiorEvaluationRatingRepository _superiorEvaluationRatingRepository;
        public readonly ISummaryEvaluationService _summaryEvaluationService;
        private readonly IMapper _mapper;
        public SuperiorEvaluationRatingService(ISuperiorEvaluationRatingRepository superiorEvaluationRatingRepository, IMapper mapper, ISummaryEvaluationService summaryEvaluationService)
        {
            _superiorEvaluationRatingRepository = superiorEvaluationRatingRepository;
            _mapper = mapper;
            _summaryEvaluationService = summaryEvaluationService;
        }

        public async Task<SuperiorEvaluationRating?> CreateSuperiorEvaluationRatingAsync(SuperiorEvaluationRatingCreateDto SuperiorEvaluationRatingDto)
        {
            var superiorEvaluationRating = _mapper.Map<SuperiorEvaluationRating>(SuperiorEvaluationRatingDto);

            var createdEvaluationRating = await _superiorEvaluationRatingRepository.CreateSuperiorEvaluationRatingAsync(superiorEvaluationRating);

            if (createdEvaluationRating != null)
            {

                //summary eval

                SummaryEvaluationCreateDto summary = new SummaryEvaluationCreateDto
                {
                    nasId = createdEvaluationRating.NASId,
                    Semester = createdEvaluationRating.Semester,
                    Year = createdEvaluationRating.Year,
                    SuperiorOverallRating = createdEvaluationRating.OverallRating
                };
                await _summaryEvaluationService.CreateSummaryEvaluationAsync(summary);

                return createdEvaluationRating;
            }
            return null;
        }

        public async Task<SuperiorEvaluationRating?> GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync(int nasId, Semester semester)
        {
            var evaluationRating = await _superiorEvaluationRatingRepository.GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync(nasId, semester);

            if (evaluationRating != null)
            {
                return evaluationRating;
            }
            return null;
        }
    }
}
