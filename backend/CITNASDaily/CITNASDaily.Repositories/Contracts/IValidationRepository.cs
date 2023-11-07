using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IValidationRepository
    {
        Task<Validation?> CreateValidaitonAsync(Validation validation);
    }
}
