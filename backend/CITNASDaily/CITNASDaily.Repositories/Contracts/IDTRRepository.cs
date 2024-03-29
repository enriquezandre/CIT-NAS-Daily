﻿using CITNASDaily.Entities.Models;
using Microsoft.AspNetCore.Http;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IDTRRepository
    {
        Task<IEnumerable<DailyTimeRecord>> GetDTRs();
        Task SaveDTRs(IFormFile file, int year, Semester semester);
        Task<IEnumerable<DailyTimeRecord>> GetDTRByNasNameAsync(string lastName, string firstName, string middleName);
        Task<IEnumerable<DailyTimeRecord>> GetDTRsBySYSemesterAsync(int year, Semester semester, string lastName, string firstName, string? middleName);
    }
}
