using CITNASDaily.Entities.Models;

namespace CITNASDaily.Services.Contracts
{
    public interface IDTRService
    {
        Task<IEnumerable<DailyTimeRecord>?> GetAllDTRAsync();
        Task SaveDTRs(IEnumerable<DailyTimeRecord> records);
        Task<IEnumerable<DailyTimeRecord>?> GetDTRByNasNameAsync(string nasName);

    }
}
