using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;


namespace CITNASDaily.Repositories.Repositories
{
	public class NASRepository : INASRepository
	{
		private readonly NASContext _context;
		private readonly IOfficeRepository _officeRepository;
		public NASRepository (NASContext context, IOfficeRepository officeRepository)
		{
			_context = context;
			_officeRepository = officeRepository;
		}

		/// <summary>
		/// this creates a new entry for the nas table 
		/// </summary>
		/// <param name="nas"></param>
		/// <returns></returns>
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

		/// <summary>
		/// this gets all nas under in one office.
		/// 
		/// </summary>
		/// <param name="officeId"></param>
		/// <returns></returns>
		public async Task<IQueryable<NAS>?> GetAllNASByOfficeId(int officeId)
		{
			var office = _officeRepository.GetOfficeById(officeId);
			if(office != null)
			{
				return await Task.FromResult(_context.NAS.Where(e => e.OfficeId == officeId));
			}
			return null;
		}

		/// <summary>
		/// this updates NAS.
		/// returns null if nas is null.
		/// otherwise, returns the updated nas
		/// </summary>
		/// <param name="nas"></param>
		/// <returns></returns>
		public async Task<NAS?> UpdateNAS(NAS nas)
		{
			var existingNAS = await _context.NAS.FindAsync(nas.Id);
			if (existingNAS != null)
			{
				//update required field
				existingNAS.YearLevel = nas.YearLevel;
				existingNAS.Course = nas.Course;
				existingNAS.BirthDate = nas.BirthDate;
				existingNAS.OfficeId = nas.OfficeId;
				existingNAS.UnitsAllowed = nas.UnitsAllowed;

				//save changes
				await _context.SaveChangesAsync();
				return existingNAS;
			}
			
			return null;
;
		}
	}
}
