using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;

namespace CITNASDaily.Services.Services
{
	public class NASService : INASService
	{
		public readonly INASRepository _nasRepository;
		public NASService (INASRepository nasRepository)
		{
			_nasRepository = nasRepository;
		}
		public async Task<List<NAS>> GetAllNASByOfficeId(int officeId)
		{
			var nas = await _nasRepository.GetAllNASByOfficeId(officeId);
			return nas.ToList();
		}
	}
}
