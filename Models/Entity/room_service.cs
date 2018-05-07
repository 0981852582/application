﻿using System;

namespace QUANLYBANHANG.Models.Entity
{
    public class room_service
    {
        public int Id { get; set; }
        public string Alias { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }
        public byte? Order { get; set; }
        public int Price { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { set; get; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}