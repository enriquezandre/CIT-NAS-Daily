using CITNASDaily.Entities.Dtos.TimekeepingSummaryDtos;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Services.Contracts
{
    public interface ITimekeepingSummaryService
    {
        Task<TimekeepingSummary?> CreateTimekeepingSummaryAsync(TimekeepingSummaryCreateDto timekeepingSummaryDto);
        Task<IEnumerable<TimekeepingSummary>?> GetAllTimekeepingSummaryAsync();
        Task<List<TimekeepingSummary>?> GetAllTimekeepingSummaryByNASIdAsync(int nasId);
        Task<TimekeepingSummary?> GetTimekeepingSummaryByNASIdSemesterYearAsync(int nasId, Semester semester, int year);
    }
}
