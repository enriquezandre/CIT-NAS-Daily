using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;


namespace CITNASDaily.Repositories.Repositories
{
	public class NASRepository : INASRepository
	{
		private readonly NASContext _context;
		public NASRepository (NASContext context)
		{
			_context = context;
		}

		public async Task<NAS?> CreateNAS(NAS nas)
		{
			if(nas != null)
			{
				await _context.NAS.AddAsync(nas);
				await _context.SaveChangesAsync();
				return nas;
			}
			return null;
			
		}

		public async Task<IQueryable<NAS>> GetAllNASByOfficeId(int officeId)
		{
			return await Task.FromResult(_context.NAS.Where(e => e.OfficeId == officeId));
		}
	}
}
