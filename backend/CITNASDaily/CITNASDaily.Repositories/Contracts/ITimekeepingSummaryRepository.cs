﻿using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Repositories.Contracts
{
    public interface ITimekeepingSummaryRepository
    {
        Task<TimekeepingSummary?> CreateTimekeepingSummaryAsync(TimekeepingSummary timekeepingSummary);
        Task<IEnumerable<TimekeepingSummary>?> GetAllTimekeepingSummaryAsync();
        Task<IQueryable<TimekeepingSummary>?> GetAllTimekeepingSummaryByNASIdAsync(int nasId);
    }
}