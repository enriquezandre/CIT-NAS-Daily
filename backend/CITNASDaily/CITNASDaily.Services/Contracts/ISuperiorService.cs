using CITNASDaily.Entities.Dtos.SuperiorDtos;

namespace CITNASDaily.Services.Contracts
{
    public interface ISuperiorService
    {
        Task<SuperiorDto?> CreateSuperiorAsync(string username, SuperiorCreateDto superiorCreate);
        public Task<SuperiorDto?> GetSuperiorAsync(int superiorId);
        Task<IEnumerable<SuperiorDto>> GetSuperiorsAsync();
        Task<Guid?> GetSuperiorUserIdByUsernameAsync(string username);
    }
}
