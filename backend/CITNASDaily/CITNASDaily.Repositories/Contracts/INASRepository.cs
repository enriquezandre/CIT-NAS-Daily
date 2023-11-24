using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Models;
using Microsoft.AspNetCore.Http;

namespace CITNASDaily.Repositories.Contracts
{
    public interface INASRepository
    {
        Task<NAS?> CreateNASAsync(NAS nas);
        Task<NAS?> GetNASAsync(int nasId);
        Task<IEnumerable<NAS>?> GetAllNASAsync();
        Task<IEnumerable<NAS>?> GetAllNasBySYSemesterAsync(List<int> nasIdList);
        Task<int> GetNASIdByUsernameAsync(string username);
        Task<IEnumerable<NAS?>> GetNASByOfficeIdAsync(int officeId);
        Task<byte[]?> UploadPhotoAsync(int nasId, IFormFile file);
        Task<NAS?> UpdateNASAsync(int nasId, NAS nas);
    }
}
