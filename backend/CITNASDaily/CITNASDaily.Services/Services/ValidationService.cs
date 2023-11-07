using AutoMapper;
using CITNASDaily.Entities.Dtos.ValidationDtos;
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
    public class ValidationService : IValidationService
    {
        private readonly IValidationRepository _validationRepository;
        private readonly IMapper _mapper;

        public ValidationService(IValidationRepository validationRepository, IMapper mapper)
        {
            _validationRepository = validationRepository;
            _mapper = mapper;
        }

        public async Task<Validation?> CreateValidaitonAsync(ValidationCreateDto validationCreateDto)
        {
            var val = _mapper.Map<Validation>(validationCreateDto);

            var createdVal = await _validationRepository.CreateValidaitonAsync(val);

            if(createdVal != null)
            {
                return createdVal;
            }
            return null;
        }
    }
}
