using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.Entity
{
    public class room_history
    {
        [Key]
        public int Id { set; get; }
        public string AliasOfRoom { get; set; }
        public string AliasOfPayLoad { get; set; }
        public int PriceOfRoom { get; set; }
        public int PriceOfService { get; set; }
        public string ListOfService { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public byte? Order { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
