using AutoMapper;
using CITNASDaily.Entities.Dtos.ScheduleDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Services
{
    public class ScheduleService : IScheduleService
    {
        public readonly IScheduleRepository _scheduleRepository;
        public readonly IMapper _mapper;

        public ScheduleService(IScheduleRepository scheduleRepository, IMapper mapper)
        {
            _scheduleRepository = scheduleRepository;
            _mapper = mapper;
        }

        public async Task<Schedule> CreateScheduleAsync(ScheduleCreateDto schedule)
        {
            var sched = _mapper.Map<Schedule>(schedule);
            var createdSched = await _scheduleRepository.CreateScheduleAsync(sched);

            if(createdSched != null)
            {
                return createdSched;
            }

            return null;
        }

        public async Task<ScheduleDto?> GetScheduleAsync(int nasId)
        {
            var sched = await _scheduleRepository.GetScheduleAsync(nasId);
            return _mapper.Map<ScheduleDto>(sched);
        }

        public async Task UpdateScheduleAsync(ScheduleUpdateDto schedule)
        {
            var sched = _mapper.Map<Schedule>(schedule);
            Console.WriteLine(sched.Id);
            await _scheduleRepository.UpdateScheduleAsync(sched);
        }
    }
}
