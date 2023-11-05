using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Repositories
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly NASContext _context;

        public ScheduleRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<Schedule?> CreateScheduleAsync(Schedule schedule)
        {
            await _context.Schedules.AddAsync(schedule);
            await _context.SaveChangesAsync();
            return schedule;
        }

        public async Task<Schedule?> GetScheduleAsync(int nasId)
        {
            return await _context.Schedules.FirstOrDefaultAsync(s => s.NASId == nasId);
        }
    }
}
