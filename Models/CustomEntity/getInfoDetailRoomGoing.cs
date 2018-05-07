using System;
using System.ComponentModel.DataAnnotations;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class getInfoDetailRoomGoing
    {
        [Key]
        public int Id { get; set; }
        public string Alias { get; set; }
        public string AliasOfPayLoad { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string CaculatorTime { get; set; }
        public int CaculatorPrice { set; get; }
        public string listOfService { get; set; }
    }
}
