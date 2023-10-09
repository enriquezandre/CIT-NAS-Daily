using AutoMapper;
using CITNASDaily.Entities.Dtos.OfficeDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Services.Contracts;

namespace CITNASDaily.Services.Services
{
    public class OfficeService : IOfficeService
    {
        public readonly IOfficeRepository _officeRepository;
        private readonly IMapper _mapper;
        public OfficeService(IOfficeRepository officeRepository, IMapper mapper)
        {
            _officeRepository = officeRepository;
            _mapper = mapper;
        }

        public async Task<Office?> CreateOfficeAsync(OfficeCreateDto office)
        {
            var of = _mapper.Map<Office>(office);
            var createdOffice = await _officeRepository.CreateOfficeAsync(of);

            if (createdOffice != null)
            {
                return createdOffice;
            }
            return null;
        }

        public async Task<IEnumerable<Office?>> GetOfficesAsync()
        {
            return await _officeRepository.GetOfficesAsync();
        }
    }
}
