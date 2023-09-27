using AutoMapper;
using CITNASDaily.Entities.Dtos;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Utils.Mappings
{
    public class RoleProfile : Profile
    {
        public RoleProfile() {

            CreateMap<Role, RoleDto>().ReverseMap();

        }
    }
}
