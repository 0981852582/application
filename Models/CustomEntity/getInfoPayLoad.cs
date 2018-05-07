using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class getInfoPayLoad
    {
        [Key]
        public int Id { get; set; }
        public string AliasOfPayLoad { get; set; }
        public string Title { get; set; }
    }
}
