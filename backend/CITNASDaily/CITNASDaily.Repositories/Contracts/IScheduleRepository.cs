using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IScheduleRepository
    {
        Task<Schedule?> CreateScheduleAsync(Schedule schedule);
        Task<IQueryable<Schedule?>> GetSchedulesByNASIdAsync(int nasId);
        Task DeleteSchedulesByNASIdAsync(int nasId);
    }
}
