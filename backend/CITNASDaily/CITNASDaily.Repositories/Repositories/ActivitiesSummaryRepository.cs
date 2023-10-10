using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Repositories.Repositories
{
    public class ActivitiesSummaryRepository : IActivitiesSummaryRepository
    {
        private readonly NASContext _context;

        public ActivitiesSummaryRepository(NASContext context)
        {
            _context = context;
        }
        public async Task<ActivitiesSummary?> CreateActivitiesSummaryAsync(ActivitiesSummary activitiesSummary)
        {
            await _context.ActivitiesSummaries.AddAsync(activitiesSummary);
            await _context.SaveChangesAsync();
            return activitiesSummary;
        }
    }
}
