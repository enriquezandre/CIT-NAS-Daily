using AutoMapper;
using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Services.Services
{
    public class NASService : INASService
    {
        private readonly INASRepository _nasRepository;
        private readonly IUserRepository _userRepository;
        private readonly INASSchoolYearSemesterRepository _schoolYearSemRepository;
        private readonly IOfficeRepository _officeRepository;
        private readonly IMapper _mapper;

        public NASService(IUserRepository userRepository, INASRepository nasRepository, INASSchoolYearSemesterRepository schoolYearSemRepository, IOfficeRepository officeRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _nasRepository = nasRepository;
            _schoolYearSemRepository = schoolYearSemRepository;
            _officeRepository = officeRepository;
            _mapper = mapper;
        }

        #region CreateNAS

        public async Task<NASDto?> CreateNASAsync(string username, NASCreateDto nasCreate)
        {
            var userId = await GetNASUserIdByUsernameAsync(username);

            if (userId == null)
            {
                return null;
            }

            var nas = _mapper.Map<NAS>(nasCreate);
            nas.UserId = userId;
            var createdNAS = await _nasRepository.CreateNASAsync(nas);

            var createdSY = await _schoolYearSemRepository.AddSchoolYearSemesterAsync(createdNAS.Id, nasCreate.SYSem);
            var sy = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(createdSY);

            var result = _mapper.Map<NASDto>(createdNAS);
            result.SYSem = sy;

            return result;
        }

        #endregion

        #region GetNAS

        public async Task<Guid?> GetNASUserIdByUsernameAsync(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null)
            {
                return null;
            }

            return user.Id;
        }

        public async Task<NASDto?> GetNASAsync(int nasId)
        {
            var nas = await _nasRepository.GetNASAsync(nasId);

            if(nas == null)
            {
                return null;
            }

            var nasDto = _mapper.Map<NASDto>(nas);
            var office = await _officeRepository.GetOfficeByNASIdAsync(nas.Id);

            nasDto.OfficeName = office.Name;

            var getSY = await _schoolYearSemRepository.GetSchoolYearSemesterAsync(nas.Id);
            nasDto.SYSem = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(getSY);

            return nasDto;
        }

        public async Task<NASDtoNoImage?> GetNASNoImageAsync(int nasId)
        {
            var nas = await _nasRepository.GetNASAsync(nasId);

            if (nas == null)
            {
                return null;
            }

            var nasDto = _mapper.Map<NASDtoNoImage>(nas);
            var office = await _officeRepository.GetOfficeByNASIdAsync(nas.Id);

            nasDto.OfficeName = office.Name;

            var getSY = await _schoolYearSemRepository.GetSchoolYearSemesterAsync(nas.Id);
            nasDto.SYSem = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(getSY);

            return nasDto;
        }

        public async Task<IEnumerable<NASDto>?> GetAllNASAsync()
        {
            var nasList = await _nasRepository.GetAllNASAsync();
            var nasDto = _mapper.Map<List<NASDto>>(nasList);

            foreach (var nas in nasDto)
            {
                nas.SYSem = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(await _schoolYearSemRepository.GetSchoolYearSemesterAsync(nas.Id));
                nas.OfficeName = await _officeRepository.GetOfficeNameAsync(nas.OfficeId);
            }

            return nasDto;
        }

        public async Task<IEnumerable<NASDtoNoImage>?> GetAllNASNoImageAsync()
        {
            var nasList = await _nasRepository.GetAllNASAsync();
            var nasDto = _mapper.Map<List<NASDtoNoImage>>(nasList);

            foreach (var nas in nasDto)
            {
                nas.SYSem = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(await _schoolYearSemRepository.GetSchoolYearSemesterAsync(nas.Id));
                nas.OfficeName = await _officeRepository.GetOfficeNameAsync(nas.OfficeId);
            }

            return nasDto;
        }

        public async Task<IEnumerable<NASDtoNoImage>?> GetAllNasBySYSemesterAsync(int year, Semester semester)
        {
            var nasIdList = await _schoolYearSemRepository.GetAllNasIdBySYSemesterAsync(year, semester);

            var nasList = await _nasRepository.GetAllNasBySYSemesterAsync(nasIdList);
            var nasDto = _mapper.Map<List<NASDtoNoImage>>(nasList);

            foreach (var nas in nasDto)
            {
                nas.SYSem = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(await _schoolYearSemRepository.GetSchoolYearSemesterAsync(nas.Id));
                nas.OfficeName = await _officeRepository.GetOfficeNameAsync(nas.OfficeId);
            }

            return nasDto;
        }

        public async Task<int> GetNASIdByUsernameAsync(string username)
        {
            return await _nasRepository.GetNASIdByUsernameAsync(username);
        }

        public async Task<NasByOfficeIdListDto> GetNASByOfficeIdSYSemesterAsync(int officeId, int year, Semester semester)
        {
            var nasByOffice = await _nasRepository.GetNASByOfficeIdSYSemesterAsync(officeId, year, semester);
            var nasDto = _mapper.Map<List<NASDtoNoImage>>(nasByOffice);

            NasByOfficeIdListDto nas = new NasByOfficeIdListDto
            {
                OfficeId = officeId,
                SchoolYear = year,
                Semester = semester,
                NASEntries = nasDto
            };

            return nas;
        }

        #endregion

        public async Task<byte[]?> UploadPhotoAsync(int nasId, IFormFile file)
        {
            return await _nasRepository.UploadPhotoAsync(nasId, file);
        }

        public async Task<NASDto?> UpdateNASAsync(int nasId, NASUpdateDto nasUpdate)
        {
            var nas = _mapper.Map<NAS>(nasUpdate);

            var updateNAS = await _nasRepository.UpdateNASAsync(nasId, nas);

            var createdSY = await _schoolYearSemRepository.AddSchoolYearSemesterAsync(updateNAS.Id, nasUpdate.SYSem);
            var sy = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(createdSY);

            var newUpdate = await _nasRepository.GetNASAsync(updateNAS.Id);

            var result = _mapper.Map<NASDto>(newUpdate);
            result.SYSem = _mapper.Map<List<NASSchoolYearSemesterCreateDto>>(await _schoolYearSemRepository.GetSchoolYearSemesterAsync(result.Id));
            result.OfficeName = await _officeRepository.GetOfficeNameAsync(result.OfficeId);

            return result;
        }
    }
}
