using AutoMapper;
using CITNASDaily.Entities.Dtos.TimekeepingSummaryDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Services.Contracts;

namespace CITNASDaily.Services.Services
{
    public class TimekeepingSummaryService : ITimekeepingSummaryService
    {
        public readonly ITimekeepingSummaryRepository _timekeepingSummaryRepository;
        private readonly IMapper _mapper;
        public TimekeepingSummaryService(ITimekeepingSummaryRepository timekeepingSummaryRepository, IMapper mapper)
        {
            _timekeepingSummaryRepository = timekeepingSummaryRepository;
            _mapper = mapper;
        }

        public async Task<TimekeepingSummary?> CreateTimekeepingSummaryAsync(TimekeepingSummaryCreateDto timekeepingSummaryDto)
        {
            var timekeepingSummary = _mapper.Map<TimekeepingSummary>(timekeepingSummaryDto);
           
            var createdActSummary = await _timekeepingSummaryRepository.CreateTimekeepingSummaryAsync(timekeepingSummary);

            if (createdActSummary != null)
            {
                return createdActSummary;
            }
            return null;
        }

        public async Task<IEnumerable<TimekeepingSummary>?> GetAllTimekeepingSummaryAsync()
        {
            return await _timekeepingSummaryRepository.GetAllTimekeepingSummaryAsync();
        }

        public async Task<List<TimekeepingSummary>?> GetAllTimekeepingSummaryByNASIdAsync(int nasId)
        {
            var timekeepingSummary = await _timekeepingSummaryRepository.GetAllTimekeepingSummaryByNASIdAsync(nasId);
            if (timekeepingSummary != null)
            {
                return timekeepingSummary.ToList();
            }
            return null;
        }
    }
}
