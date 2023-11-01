using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface INASRepository
    {
        Task<NAS?> CreateNASAsync(NAS nas);
        Task<NAS?> GetNASAsync(int nasId);
        Task<IQueryable<NAS?>> GetNASByOfficeIdAsync(int officeId);
    }
}
