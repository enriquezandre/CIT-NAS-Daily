using CITNASDaily.Entities.Dtos.SuperiorDtos;

namespace CITNASDaily.Services.Contracts
{
    public interface ISuperiorService
    {
        Task<SuperiorDto?> CreateSuperiorsAsync(SuperiorCreateDto superiorCreate);
        Task<SuperiorDto?> GetSuperiorAsync(int superiorId);
        Task<IEnumerable<SuperiorDto>> GetSuperiorsAsync();
    }
}
