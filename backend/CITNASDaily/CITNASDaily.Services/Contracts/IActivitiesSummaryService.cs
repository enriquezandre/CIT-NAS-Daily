using CITNASDaily.Entities.Dtos.ActivitiesSummaryDtos;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Contracts
{
    public interface IActivitiesSummaryService
    {
        Task<ActivitiesSummary?> CreateActivitiesSummaryAsync(ActivitiesSummaryCreateDto activitiesSummaryDto);
        Task<IEnumerable<ActivitiesSummary>?> GetAllActivitiesSummaryAsync();
        Task<List<ActivitiesSummary>?> GetAllActivitiesSummaryByNASIdAsync(int nasId);
    }
}
