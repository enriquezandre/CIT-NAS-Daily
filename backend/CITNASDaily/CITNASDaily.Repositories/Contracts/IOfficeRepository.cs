﻿using CITNASDaily.Entities.Models;

namespace CITNASDaily.Repositories.Contracts
{
    public interface IOfficeRepository
    {
        Task<Office?> CreateOfficeAsync(Office office);
        Task<IEnumerable<Office?>> GetOfficesAsync();
    }
}