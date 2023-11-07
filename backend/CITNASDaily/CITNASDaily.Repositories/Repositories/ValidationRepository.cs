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
    public class ValidationRepository : IValidationRepository
    {
        private readonly NASContext _context;

        public ValidationRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<Validation?> CreateValidaitonAsync(Validation validation)
        {
            await _context.Validations.AddAsync(validation);
            await _context.SaveChangesAsync();
            return validation;
        }
    }
}
