﻿using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using Microsoft.AspNetCore.Http;

namespace CITNASDaily.Services.Contracts
{
    public interface INASService
    {
        Task<NASDto?> CreateNASAsync(string username, NASCreateDto nasCreate);
        Task<NASDto?> GetNASAsync(int nasId);
        Task<NASDtoNoImage?> GetNASNoImageAsync(int nasId);
        Task<Guid?> GetNASUserIdByUsernameAsync(string username);
        Task<List<NAS?>> GetNASByOfficeIdAsync(int officeId);
        Task<int> GetNASIdByUsernameAsync(string username);
        Task<IEnumerable<NAS>?> GetAllNASAsync();
        Task<IEnumerable<NASDtoNoImage>?> GetAllNASNoImageAsync();
        Task<byte[]?> UploadPhotoAsync(int nasId, IFormFile file);
    }
}
