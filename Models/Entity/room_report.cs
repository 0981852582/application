using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.Entity
{
    public class room_report
    {
        public int Id { get; set; }
        public int Price { get; set; }
        public int Number { get; set; }
        public int IndicatorDate { get; set; }
        public int IndicatorMonth { get; set; }
        public int IndicatorYear { get; set; }
        public byte? Status { get; set; }
    }
}
