using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface INASRepository
    {
        Task CreateNAS(NAS nas);
        Task<IQueryable<NAS>> GetAllNASByOfficeId(int officeId);
    }
}
