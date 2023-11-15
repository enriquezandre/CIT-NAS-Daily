﻿using AutoMapper;
using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

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
            var summaryEvaluation = _mapper.Map<SummaryEvaluation>(summaryEvaluationCreateDto);

            return await _summaryEvaluationRepository.CreateSummaryEvaluationAsync(summaryEvaluation);
        }

        public async Task<IEnumerable<SummaryEvaluationDto?>> GetSummaryEvaluationsAsync()
        {
            var summaryeval = await _summaryEvaluationRepository.GetSummaryEvaluationsAsync();

            return _mapper.Map<IEnumerable<SummaryEvaluationDto>>(summaryeval);
        }
        public async Task<SummaryEvaluation?> GetSummaryEvaluationByNASIdSemesterYearAsync(int nasId, Semester semester, int year)
        {
            var summaryeval = await _summaryEvaluationRepository.GetSummaryEvaluationByNASIdSemesterYearAsync(nasId, semester, year);

            return _mapper.Map<SummaryEvaluation>(summaryeval);
        }

        public async Task<SummaryEvaluation?> UpdateSummaryEvaluationAsync(SummaryEvaluationUpdateDto summaryEvaluationUpdateDto)
        {
            var summaryEvaluation = _mapper.Map<SummaryEvaluation>(summaryEvaluationUpdateDto);
            return await _summaryEvaluationRepository.UpdateSummaryEvaluationAsync(summaryEvaluation);
        }

        public async Task<SummaryEvaluation?> UploadGrades(SummaryEvaluationGradeUpdateDto summary, IFormFile file)
        {
            var summaryeval = _mapper.Map<SummaryEvaluation>(summary);
            return await _summaryEvaluationRepository.UploadGrades(summaryeval, file);
        }
    }
}
