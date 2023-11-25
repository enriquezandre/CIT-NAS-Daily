using AutoMapper;
using CITNASDaily.Entities.Dtos.DailyTimeRecordDto;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Services.Contracts;
using System.Collections.Generic;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Services.Services
{
    public class DTRService : IDTRService
    {
        private readonly IDTRRepository _dtrRepository;
        private readonly IMapper _mapper;

        public DTRService(IDTRRepository dtrRepository, IMapper mapper)
        {
            _dtrRepository = dtrRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DailyTimeRecord>?> GetAllDTRAsync()
        {
            return await _dtrRepository.GetDTRs();
        }

        public async Task<IEnumerable<DailyTimeRecord>?> GetDTRByNasNameAsync(string nasName)
        {
            return await _dtrRepository.GetDTRByNasNameAsync(nasName);
        }

        public async Task SaveDTRs(IEnumerable<DailyTimeRecord> records)
        {
            await _dtrRepository.SaveDTRs(records);
        }

        public async Task<DailyTimeRecordListDto> GetDTRsBySYSemesterAsync(int year, Semester semester)
        {
            var dtrList = await _dtrRepository.GetDTRsBySYSemesterAsync(year, semester);

            var dtrDto = _mapper.Map<List<DailyTimeRecordDto>>(dtrList);

            DailyTimeRecordListDto dailyTimeRecordListDto = new DailyTimeRecordListDto
            {
                SchoolYear = year,
                Semester = semester,
                DailyTimeRecords = dtrDto
            };

            return dailyTimeRecordListDto;
        }
    }
}
