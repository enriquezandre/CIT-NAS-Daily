﻿using CITNASDaily.Entities.Models;
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
    public class ValidationRepository : IValidationRepository
    {
        private readonly NASContext _context;

        public ValidationRepository(NASContext context)
        {
            _context = context;
        }

        public async Task<Validation?> CreateValidationAsync(Validation validation)
        {
            validation.DateSubmitted = DateTime.Now;
            validation.ValidationStatus = ValidationStatus.Pending;
            await _context.Validations.AddAsync(validation);
            await _context.SaveChangesAsync();
            return validation;
        }

        public async Task<IEnumerable<Validation>?> GetAllValidationsAsync()
        {
            return await _context.Validations.ToListAsync();
        }

        public async Task<Validation?> GetValidationByIdAsync(int validationId)
        {
            return await _context.Validations.FirstOrDefaultAsync(v => v.Id == validationId);
        }

        public async Task<Validation?> UpdateValidationAsync(Validation validation, int validationId)
        {
            var existingValidation = await _context.Validations.FindAsync(validationId);

            if(existingValidation != null)
            {
                existingValidation.ValidationStatus = validation.ValidationStatus;
                existingValidation.MakeUpHours = validation.MakeUpHours;
                await _context.SaveChangesAsync();
                return existingValidation;
            }

            return null;
        }
    }
}
