using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class DetailHistoryOfRoom
    {
        [Key]
        public int Id { get; set; }
        public int PriceOfRoom { get; set; }
        public int PriceOfService { get; set; }
        public string AliasOfRoom { get; set; }
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
