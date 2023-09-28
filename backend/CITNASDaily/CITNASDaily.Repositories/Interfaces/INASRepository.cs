using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Repositories.Interfaces
{
	public interface INASRepository
	{
		public Task<NAS?> GetAllNASByOfficeIdAsync(int officeId);
	}
}
