using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IOASRepository
    {
        Task<OAS?> CreateOASAsync(OAS oas);
        public Task<OAS?> GetOAS(Guid? userId, int oasId);
    }
}
