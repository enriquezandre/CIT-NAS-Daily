using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface INASRepository
    {
        Task<NAS?> CreateNASAsync(NAS nas);
        Task<NAS?> GetNASAsync(Guid? userId, int nasId);
    }
}
