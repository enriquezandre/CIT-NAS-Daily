using CITNASDaily.Entities.Dtos.ScheduleDtos;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Contracts
{
    public interface IScheduleService
    {
        Task<Schedule> CreateScheduleAsync(ScheduleCreateDto schedule);
        Task<ScheduleDto?> GetScheduleAsync(int nasId);
        Task DeleteScheduleByNASIdAsync(int nasId);
    }
}
