using System;

namespace QUANLYBANHANG.Models.Entity
{
    public class room_going
    {
        public int Id { get; set; }
        public string Alias { get; set; }
        public string AliasOfPayLoad { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string listOfService { get; set; }
        public byte? Order { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { set; get; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
