using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
    public class NASSchoolYear
    {
        [Key]
        public int Id { get; set; }
        public int NASId { get; set; }
        public int Year { get; set; }
    }
}