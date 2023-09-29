using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CITNASDaily.Entities.Dtos;
using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Utils.Mappings
{
	public class NASProfile : Profile
	{
		public NASProfile() 
		{
			CreateMap<NAS, NASCreationDto>().ReverseMap();
		}
	}
}
