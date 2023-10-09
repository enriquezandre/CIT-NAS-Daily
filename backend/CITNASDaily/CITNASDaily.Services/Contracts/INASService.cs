using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;

namespace CITNASDaily.Services.Contracts
{
    public interface INASService
    {
        Task<NASDto?> CreateNASAsync(string username, NASCreateDto nasCreate);
        Task<NASDto?> GetNASAsync(string username, int nasId);
        Task<Guid?> GetNASUserIdByUsernameAsync(string username);
    }
}
