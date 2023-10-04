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

		/// <summary>
		/// this creates a new office entry.
		/// returns null if creation fails.
		/// otherwise, returns the new office entry
		/// </summary>
		/// <param name="officeDto"></param>
		/// <returns></returns>
		public async Task<Office?> CreateOffice(OfficeCreationDto officeDto)
		{
			var office = _mapper.Map<Office>(officeDto);
			var createdOffice = await _officeRepository.AddOffice(office);
			if (createdOffice != null)
			{
				return createdOffice;
			}
			return null;
		}

		/// <summary>
		/// this gets all the offices in the table
		/// </summary>
		/// <returns></returns>
		public async Task<IEnumerable<Office>> GetAllOffices()
		{
			return await _officeRepository.GetAllOffices();
		}

		/// <summary>
		/// this returns an office via it's id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public async Task<Office?> GetOfficeById(int id)
		{
			return await GetOfficeById(id);
		}
	}
}
