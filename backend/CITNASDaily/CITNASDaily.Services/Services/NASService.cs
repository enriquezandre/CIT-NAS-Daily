using AutoMapper;
using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Dtos.StudentSemesterDto;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;

namespace CITNASDaily.Services.Services
{
    public class NASService : INASService
    {
        private readonly INASRepository _nasRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public NASService(IUserRepository userRepository, INASRepository nasRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _nasRepository = nasRepository;
        }
        public async Task<NASDto?> CreateNASAsync(string username, NASCreateDto nasCreate)
        {
            var userId = await GetNASUserIdByUsernameAsync(username);

            if (userId == null)
            {
                return null;
            }

            var nas = _mapper.Map<NAS>(nasCreate);
            nas.UserId = userId;
            var createdSuperior = await _nasRepository.CreateNASAsync(nas);

            var createdSY = await _nasRepository.AddSchoolYear(createdSuperior.Id, nasCreate.SchoolYear);
            var sy = _mapper.Map<List<NASSchoolYearCreateDto>>(createdSY);

            var createdSem = await _nasRepository.AddSemester(createdSuperior.Id, nasCreate.Semester);
            var sem = _mapper.Map<List<NASSemesterCreateDto>>(createdSem);

            var result = _mapper.Map<NASDto>(createdSuperior);
            result.SchoolYear = sy;
            result.Semester = sem;

            return result;
        }

        public async Task<NASDto?> GetNASAsync(int nasId)
        {
            var nas = await _nasRepository.GetNASAsync(nasId);

            return _mapper.Map<NASDto>(nas);
        }

        public async Task<NASDtoNoImage?> GetNASNoImageAsync(int nasId)
        {
            var nas = await _nasRepository.GetNASAsync(nasId);

            return _mapper.Map<NASDtoNoImage>(nas);
        }

        public async Task<Guid?> GetNASUserIdByUsernameAsync(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null)
            {
                return null;
            }

            return user.Id;
        }

        public async Task<List<NAS?>> GetNASByOfficeIdAsync(int officeId)
        {
            var nasByOffice = await _nasRepository.GetNASByOfficeIdAsync(officeId);
            return nasByOffice.ToList();
        }

        public async Task<int> GetNASIdByUsernameAsync(string username)
        {
            return await _nasRepository.GetNASIdByUsernameAsync(username);
        }

        public async Task<IEnumerable<NAS>?> GetAllNASAsync()
        {
            return await _nasRepository.GetAllNASAsync();
        }

        public async Task<IEnumerable<NASDtoNoImage>?> GetAllNASNoImageAsync()
        {
            var nas = await _nasRepository.GetAllNASAsync();
            var nasNoImg = _mapper.Map<IEnumerable<NASDtoNoImage>>(nas);

            return nasNoImg;
        }

        public async Task<byte[]?> UploadPhotoAsync(int nasId, IFormFile file)
        {
            return await _nasRepository.UploadPhotoAsync(nasId, file);
        }

        public async Task<NASDto?> UpdateNASAsync(int nasId, NASUpdateDto nasUpdate)
        {
            var nas = _mapper.Map<NAS>(nasUpdate);

            var updatedNAS = await _nasRepository.UpdateNASAsync(nasId, nas);

            var createdSY = await _nasRepository.AddSchoolYear(updatedNAS.Id, nasUpdate.SchoolYears);
            var sy = _mapper.Map<List<NASSchoolYearCreateDto>>(createdSY);

            var createdSem = await _nasRepository.AddSemester(updatedNAS.Id, nasUpdate.Semesters);
            var sem = _mapper.Map<List<NASSemesterCreateDto>>(createdSem);

            var result = _mapper.Map<NASDto>(updatedNAS);
            result.SchoolYear = sy;
            result.Semester = sem;
            return result;
        }
    }
}
