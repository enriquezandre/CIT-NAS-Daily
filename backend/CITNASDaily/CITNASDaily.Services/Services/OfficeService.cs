using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CITNASDaily.Entities.Dtos.OfficeDto;
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
		public async Task<int?> CreateOffice(OfficeCreationDto officeDto)
		{
			var office = _mapper.Map<Office>(officeDto);
			var createdOffice = await _officeRepository.AddOffice(office);
			if (createdOffice != null)
			{
				return createdOffice.Id;
			}
			return 0;
		}
	}
}
