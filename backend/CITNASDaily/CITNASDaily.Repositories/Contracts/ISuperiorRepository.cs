using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface ISuperiorRepository
    {
        Task<Superior?> CreateSuperiorAsync(Superior superior);
        Task<Superior?> GetSuperiorAsync(Guid? userId, int superiorId);
        Task<IEnumerable<Superior?>> GetSuperiorsAsync();
        public Task<Superior?> GetSuperiorByUserIdAsync(Guid? userId);
        public Task<Superior?> GetSuperiorByUsernameAsync(string username);
    }
}
