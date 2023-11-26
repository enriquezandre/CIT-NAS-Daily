using CITNASDaily.Entities.Models;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IDTRRepository
    {
        Task<IEnumerable<DailyTimeRecord>> GetDTRs();
        Task SaveDTRs(IEnumerable<DailyTimeRecord> records);
        Task<IEnumerable<DailyTimeRecord>> GetDTRByNasNameAsync(string nasName);
        Task<IEnumerable<DailyTimeRecord>> GetDTRsBySYSemesterAsync(int year, Semester semester);
    }
}
