using CITNASDaily.Entities.Dtos.ValidationDtos;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Services.Contracts
{
    public interface IValidationService
    {
        Task<Validation?> CreateValidaitonAsync(ValidationCreateDto validationCreateDto);
    }
}
