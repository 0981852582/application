using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class getDetailPayLoad
    {
        [Key]
        public int Id { set; get; }
        public string AliasOfPrice { get; set; }
        public int Price { get; set; }
        public byte? Order { get; set; }
        public byte? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public byte? ToDay { get; set; }
        public byte? ToHours { get; set; }
    }
}
