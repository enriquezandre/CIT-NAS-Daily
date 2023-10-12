﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Enums
{
    public class Enums
    {
        public enum Semester
        {
            [Description("1st Semester")]
            FirstSemester,
            [Description("2nd Semester")]
            SecondSemester,
            [Description("Summer")]
            Summer
        }
    }
}