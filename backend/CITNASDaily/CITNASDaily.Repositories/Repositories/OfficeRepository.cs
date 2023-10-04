using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;

namespace CITNASDaily.Repositories.Repositories
{
	public class OfficeRepository : IOfficeRepository
	{
		private readonly NASContext _context;
		public OfficeRepository(NASContext context)
		{
			_context = context;
		}
		public async Task<Office?> AddOffice(Office office)
		{
			if (office != null)
			{
				await _context.Offices.AddAsync(office);
				await _context.SaveChangesAsync();
				return office;
			}
			return null;
		}
	}
}
