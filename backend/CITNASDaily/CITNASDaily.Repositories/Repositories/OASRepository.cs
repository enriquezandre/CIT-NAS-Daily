﻿using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Repositories
{
    public class OASRepository : IOASRepository
    {
        private readonly NASContext _context;

        public OASRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<OAS?> CreateOASAsync(OAS oas)
        {
            await _context.OAS.AddAsync(oas);
            await _context.SaveChangesAsync();
            return oas;
        }

        public async Task<IEnumerable<OAS>?> GetAllOASAsync()
        {
            return await _context.OAS.ToListAsync();
        }

        public async Task<OAS?> GetOAS(int oasId)
        {
            return await _context.OAS
                .Include(s => s.User)
                .FirstOrDefaultAsync(c => c.Id == oasId);
        }

        public async Task<int> GetOASIdByUsernameAsync(string username)
        {
            var oas = await _context.OAS.FirstOrDefaultAsync(c => c.Username == username);
            if (oas != null)
            {
                return oas.Id;
            }
            return 0;
        }

        public async Task<bool> DeleteOASByIdAsync(int id)
        {
            var oasToDelete = await _context.OAS.FindAsync(id);
    
            if (oasToDelete == null)
            {
                return false;
            }

            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == oasToDelete.UserId);

            _context.OAS.Remove(oasToDelete);
            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
