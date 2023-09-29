using AutoMapper;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Services.Contracts;

namespace CITNASDaily.Services.Services
{
    public class SuperiorService : ISuperiorService
    {
        private readonly ISuperiorRepository _superiorRepository;
        private readonly IMapper _mapper;

        public SuperiorService(ISuperiorRepository superiorRepository, IMapper mapper)
        {
            _mapper = mapper;
            _superiorRepository = superiorRepository;
        }
        public async Task<SuperiorDto?> CreateSuperiorsAsync(SuperiorCreateDto superiorCreate)
        {
            var superior = _mapper.Map<Superior>(superiorCreate);
            var createdSuperior = await _superiorRepository.CreateSuperiorAsync(superior);

            return _mapper.Map<SuperiorDto>(createdSuperior);
        }

        public async Task<SuperiorDto?> GetSuperiorAsync(int superiorId)
        {
            var superior = await _superiorRepository.GetSuperiorAsync(superiorId);

            return _mapper.Map<SuperiorDto>(superior);
        }

        public async Task<IEnumerable<SuperiorDto>> GetSuperiorsAsync()
        {
            var superior = await _superiorRepository.GetSuperiorsAsync();

            return _mapper.Map<IEnumerable<SuperiorDto>>(superior);
        }
    }
}
