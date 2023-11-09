using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Dtos.NASDtos
{
    public class NASPhotoUpdateDto
    {
        public int Id { get; set; }
        public byte[]? Image { get; set; }
    }
}
