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

		/// <summary>
		/// this adds new NAS on the NAS table.
		/// if creation fails, this returns 0. otherwise, it will return the nas id
		/// </summary>
		/// <param name="nasDto"></param>
		/// <returns></returns>
		public async Task<int?> CreateNAS(NASCreationDto nasDto)
		{
			var nas = _mapper.Map<NAS>(nasDto);
			var createdNas = await _nasRepository.CreateNAS(nas);
			if (createdNas != null)
			{
				return createdNas.Id;
			}
			return 0;
		}

		/// <summary>
		/// this gets all the nas under an office.
		/// if there is no nas under an office, it will return null.
		/// otherwise, it will return all the nas
		/// </summary>
		/// <param name="officeId"></param>
		/// <returns></returns>
		public async Task<List<NAS>?> GetAllNASByOfficeId(int officeId)
		{
			var nas = await _nasRepository.GetAllNASByOfficeId(officeId);
			if (nas != null)
			{
				return nas.ToList();
			}
			return null;
		}
	}
}
