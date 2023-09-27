using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetRolesAsync();
    }
}
