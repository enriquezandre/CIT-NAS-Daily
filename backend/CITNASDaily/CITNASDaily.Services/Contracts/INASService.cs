using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Services.Contracts
{
    public interface INASService
    {
        Task<NASDto?> CreateNASAsync(string username, NASCreateDto nasCreate);
        Task<NASDto?> GetNASAsync(int nasId);
        Task<Guid?> GetNASUserIdByUsernameAsync(string username);
        Task<List<NAS?>> GetNASByOfficeIdAsync(int officeId);
    }
}
