﻿using AutoMapper;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Utils.Mappings
{
    public class SuperiorProfile : Profile
    {
        public SuperiorProfile()
        {

            CreateMap<Superior, SuperiorDto>().ReverseMap();

            CreateMap<Superior, SuperiorCreateDto>()
                .ReverseMap()
                .ForMember(superior => superior.OfficeId, op => op.MapFrom(dto => dto.OfficeId)) // Map OfficeId
                .ForMember(superior => superior.FirstName, op => op.MapFrom(dto => dto.FirstName)) //Map first name
                .ForMember(superior => superior.LastName, op => op.MapFrom(dto => dto.LastName)); // Map last name
        }
    }
}
    