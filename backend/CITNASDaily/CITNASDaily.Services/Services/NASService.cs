﻿using AutoMapper;
using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;

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
            var nas = _mapper.Map<NAS>(nasCreate);

            var userId = await GetNASUserIdByUsernameAsync(username);

            if (userId == null)
            {
                return null;
            }

            nas.UserId = userId;
            var createdSuperior = await _nasRepository.CreateNASAsync(nas);

            return _mapper.Map<NASDto>(createdSuperior);
        }

        public async Task<NASDto?> GetNASAsync(string username, int nasId)
        {
            var userId = await GetNASUserIdByUsernameAsync(username);

            if (userId == null)
            {
                // subject to change
                return null;
            }

            var nas = await _nasRepository.GetNASAsync(userId, nasId);

            return _mapper.Map<NASDto>(nas);
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
    }
}