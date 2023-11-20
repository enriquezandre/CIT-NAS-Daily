using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Models;
using Microsoft.AspNetCore.Http;

namespace CITNASDaily.Repositories.Contracts
{
    public interface INASRepository
    {
        Task<NAS?> CreateNASAsync(NAS nas);
        Task<NAS?> GetNASAsync(int nasId);
        Task<IQueryable<NAS?>> GetNASByOfficeIdAsync(int officeId);
        Task<int> GetNASIdByUsernameAsync(string username);
        Task<IEnumerable<NAS>?> GetAllNASAsync();
        Task<byte[]?> UploadPhotoAsync(int nasId, IFormFile file);
        Task<NAS?> UpdateNASAsync(int nasId, NAS nas);
    }
}
