using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface ISuperiorRepository
    {
        Task<Superior?> CreateSuperiorAsync(Superior superior);
        Task<Superior?> GetSuperiorAsync(int superiorId);
        Task<IEnumerable<Superior?>> GetSuperiorsAsync();
    }
}
