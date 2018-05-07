using System;
using System.ComponentModel.DataAnnotations;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class getInfoOfRoomGoing
    {
        [Key]
        public string Alias { set; get; }
        public string AliasOfPayLoad { get; set; }
        public string Title { set; get; }
        public string listOfService { set; get; }
        public DateTime? StartTime { set; get; }
        public bool? Status { set; get; }
    }
}
