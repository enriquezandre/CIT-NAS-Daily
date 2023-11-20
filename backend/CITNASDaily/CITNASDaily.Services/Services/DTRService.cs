using AutoMapper;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Services.Contracts;

namespace CITNASDaily.Services.Services
{
    public class DTRService : IDTRService
    {
        private readonly IDTRRepository _dtrRepository;

        public DTRService(IDTRRepository dtrRepository)
        {
            _dtrRepository = dtrRepository;
        }
        public async Task<IEnumerable<DailyTimeRecord>?> GetAllDTRAsync()
        {
            return await _dtrRepository.GetDTRs();
        }

        public async Task<IEnumerable<DailyTimeRecord>?> GetDTRByNasNameAsync(string nasName)
        {
            return await _dtrRepository.GetDTRByNasNameAsync(nasName);
        }

        public async Task SaveDTRs(IEnumerable<DailyTimeRecord> records)
        {
            await _dtrRepository.SaveDTRs(records);
        }
    }
}
