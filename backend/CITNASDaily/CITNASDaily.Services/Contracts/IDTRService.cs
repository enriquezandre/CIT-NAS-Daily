using CITNASDaily.Entities.Dtos.DailyTimeRecordDto;
using CITNASDaily.Entities.Models;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Services.Contracts
{
    public interface IDTRService
    {
        Task<IEnumerable<DailyTimeRecord>?> GetAllDTRAsync();
        Task SaveDTRs(IEnumerable<DailyTimeRecord> records);
        Task<IEnumerable<DailyTimeRecord>?> GetDTRByNasNameAsync(string nasName);
        Task<DailyTimeRecordListDto> GetDTRsBySYSemesterAsync(int year, Semester semester, string firstName, string lastName, string middleName);
    }
}
