using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	/// <summary>
	/// This is the class for the User Model
	/// </summary>
	public class User
	{
		public int Id { get; set; }
		public string? UserName { get; set; }
		public string? Password { get; set; }
		public string? RoleCode { get; set; } //idk  if this is string, please check uwu >,<
	}
}
