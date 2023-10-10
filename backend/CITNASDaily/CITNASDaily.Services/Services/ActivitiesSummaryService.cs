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
    }
}
