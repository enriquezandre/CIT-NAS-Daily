using AutoMapper;
using CITNASDaily.Entities.Dtos.ActivitiesSummaryDtos;
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
    public class ActivitiesSummaryService : IActivitiesSummaryService
    {
        public readonly IActivitiesSummaryRepository _activitiesSummaryRepository;
        private readonly IMapper _mapper;
        public ActivitiesSummaryService(IActivitiesSummaryRepository activitiesSummaryRepository, IMapper mapper)
        {
            _activitiesSummaryRepository = activitiesSummaryRepository;
            _mapper = mapper;
        }
        public async Task<ActivitiesSummary?> CreateActivitiesSummaryAsync(ActivitiesSummaryCreateDto activitiesSummaryDto)
        {
            var activitiesSummary = _mapper.Map<ActivitiesSummary>(activitiesSummaryDto);
            activitiesSummary.DateOfEntry = DateTime.Now; //set date created
            var createdActSummary = await _activitiesSummaryRepository.CreateActivitiesSummaryAsync(activitiesSummary);

            if (createdActSummary != null)
            {
                return createdActSummary;
            }
            return null;
        }

        public async Task<IEnumerable<ActivitiesSummary>?> GetAllActivitiesSummaryAsync()
        {
            return await _activitiesSummaryRepository.GetAllActivitiesSummaryAsync();
        }

        public async Task<List<ActivitiesSummary>?> GetAllActivitiesSummaryByNASIdAsync(int nasId)
        {
            var actSummaries = await _activitiesSummaryRepository.GetAllActivitiesSummaryByNASIdAsync(nasId);
            if (actSummaries != null)
            {
                return actSummaries.ToList();
            }
            return null;
           
        }

        public async Task<List<ActivitiesSummary?>> GetAllActivitiesSummaryByNASIdMonthYearAsync(int nasId, int month, int year)
        {
            var actSummaries = await _activitiesSummaryRepository.GetAllActivitiesSummaryByNASIdMonthYearAsync(nasId, month, year);
            return actSummaries.ToList();
        }
    }
}
