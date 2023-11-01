using AutoMapper;
using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Services
{
    public class SummaryEvaluationService : ISummaryEvaluationService
    {
        public readonly ISummaryEvaluationRepository _summaryEvaluationRepository;
        private readonly IMapper _mapper;

        public SummaryEvaluationService(ISummaryEvaluationRepository summaryEvaluationRepository, IMapper mapper)
        {
            _summaryEvaluationRepository = summaryEvaluationRepository;
            _mapper = mapper;
        }

        public async Task<SummaryEvaluation?> CreateSummaryEvaluationAsync(SummaryEvaluationCreateDto summaryEvaluationCreateDto)
        {
            var status = "";
            var allowed = true;

            if(summaryEvaluationCreateDto.SuperiorOverallRating <= 5 && summaryEvaluationCreateDto.SuperiorOverallRating >= 4.1)
            {
                status = "EXCELLENT";
            }
            else if (summaryEvaluationCreateDto.SuperiorOverallRating <= 4.0 && summaryEvaluationCreateDto.SuperiorOverallRating >= 3.0)
            {
                status = "GOOD";
            }
            else
            {
                status = "POOR";
            }

            if(status == "POOR")
            {
                allowed = false;
            }

            summaryEvaluationCreateDto.TimekeepingStatus = status;
            summaryEvaluationCreateDto.EnrollmentAllowed = allowed;

            var summaryEvaluation = _mapper.Map<SummaryEvaluation>(summaryEvaluationCreateDto);

            var createdSummaryEvaluation = await _summaryEvaluationRepository.CreateSummaryEvaluationAsync(summaryEvaluation);

            if (createdSummaryEvaluation != null)
            {
                return createdSummaryEvaluation;
            }
            return null;
        }
    }
}
