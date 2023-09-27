using CITNASDaily.Entities.Dtos;

namespace CITNASDaily.Services.Contracts
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleDto>> GetRolesAsync();


    }
}
