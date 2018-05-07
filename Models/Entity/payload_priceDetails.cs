using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.Entity
{
    public class payload_priceDetails
    {
        public int Id { get; set; }
        public string AliasOfPrice { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public byte? ToDay { get; set; }
        public byte? ToHours { get; set; }
        public int? Price { set; get; }
        public byte? Status { set; get; }
        public byte? Order { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { set; get; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
