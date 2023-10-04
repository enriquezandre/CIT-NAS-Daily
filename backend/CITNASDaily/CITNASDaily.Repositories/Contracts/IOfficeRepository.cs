using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
	public interface IOfficeRepository
	{
		Task<Office?> AddOffice(Office office);
	}
}
