using CITNASDaily.Entities.Dtos.OASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;

namespace CITNASDaily.Services.Contracts
{
    public interface IOASService
    {
        Task<OASDto?> CreateOASAsync(string username, OASCreateDto oasCreate);
        public Task<OASDto?> GetOASAsync(int oasId);
        Task<Guid?> GetOASUserIdByUsernameAsync(string username);
    }
}
