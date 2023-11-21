using AutoMapper;
using CITNASDaily.Entities.Dtos.StudentSemesterDto;
using CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto;
using CITNASDaily.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Utils.Mappings
{
    public class NASSemesterProfile : Profile
    {
        public NASSemesterProfile()
        {
            CreateMap<NASSemester, NASSemesterCreateDto>().ReverseMap();
        }
    }
}