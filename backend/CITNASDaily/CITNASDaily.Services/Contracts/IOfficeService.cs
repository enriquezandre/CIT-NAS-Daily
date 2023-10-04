using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Dtos.OfficeDto;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Services.Contracts
{
	public interface IOfficeService
	{
		Task<Office?> GetOfficeById(int id);
		Task<IEnumerable<Office>> GetAllOffices();
		Task<Office?> CreateOffice(OfficeCreationDto officeDto);
	}
}
