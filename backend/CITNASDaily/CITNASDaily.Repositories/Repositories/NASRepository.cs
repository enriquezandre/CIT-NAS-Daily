﻿using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace CITNASDaily.Repositories.Repositories
{
    public class NASRepository : INASRepository
    {
        private readonly NASContext _context;

        public NASRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<NAS?> CreateNASAsync(NAS nas)
        {
            await _context.NAS.AddAsync(nas);
            await _context.SaveChangesAsync();
            return nas;
        }

        public async Task<IEnumerable<NAS>?> GetAllNASAsync()
        {
            return await _context.NAS.ToListAsync();
        }

        public async Task<NAS?> GetNASAsync(int nasId)
        {
            return await _context.NAS.FirstOrDefaultAsync(n => n.Id == nasId);
        }

        public async Task<IQueryable<NAS?>> GetNASByOfficeIdAsync(int officeId)
        {
            return await Task.FromResult(_context.NAS.Where(e => e.OfficeId == officeId));
        }

        public async Task<int> GetNASIdByUsernameAsync(string username)
        {
            var nas = await _context.NAS.FirstOrDefaultAsync(c => c.Username == username);
            if (nas != null)
            {
                return nas.Id;
            }
            return 0;
        }
    }
}
