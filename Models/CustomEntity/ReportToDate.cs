using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class ReportToDate
    {
        [Key]
        public int Id { get; set; }
        public int Price { get; set; }
        public int Number { get; set; }
        public int IndicatorDate { get; set; }
        public int IndicatorMonth { get; set; }
        public DateTime? Date { get; set; }
        public string Day { get; set; }
    }
}
