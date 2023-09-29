using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CITNASDaily.Services.Services
{
	public class NASService : INASService
	{
		public readonly INASRepository _nasRepository;
		private readonly IMapper _mapper;
		public NASService (INASRepository nasRepository, IMapper mapper)
		{
			_nasRepository = nasRepository;
			_mapper = mapper;
		}

		public async Task<int> CreateNAS(NASCreationDto nasDto)
		{
			var nas = _mapper.Map<NAS>(nasDto);
			await _nasRepository.CreateNAS(nas);
			return nas.Id;
		}

		public async Task<List<NAS>> GetAllNASByOfficeId(int officeId)
		{
			var nas = await _nasRepository.GetAllNASByOfficeId(officeId);
			return nas.ToList();
		}
	}
}
