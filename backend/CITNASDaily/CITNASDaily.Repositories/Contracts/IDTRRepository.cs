using CITNASDaily.Entities.Models;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IDTRRepository
    {
        Task<IEnumerable<DailyTimeRecord>> GetDTRs();
        Task SaveDTRs(IEnumerable<DailyTimeRecord> records);
        Task<IEnumerable<DailyTimeRecord>> GetDTRByNasNameAsync(string firstName, string lastName, string middleName);
        Task<IEnumerable<DailyTimeRecord>> GetDTRsBySYSemesterAsync(int year, Semester semester, string firstName, string lastName, string middleName);
    }
}
