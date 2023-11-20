using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IDTRRepository
    {
        Task<IEnumerable<DailyTimeRecord>> GetDTRs();
        Task SaveDTRs(IEnumerable<DailyTimeRecord> records);
        Task<IEnumerable<DailyTimeRecord>> GetDTRByNasNameAsync(string nasName);
    }
}
