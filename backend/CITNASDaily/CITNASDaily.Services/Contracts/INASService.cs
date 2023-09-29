﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Services.Contracts
{
	public interface INASService
	{
		Task<int> CreateNAS(NASCreationDto nasDto);
		Task<List<NAS>> GetAllNASByOfficeId(int officeId);
	}
}