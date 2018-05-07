using System.ComponentModel.DataAnnotations;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class GetInfoService
    {
        [Key]
        public int Id { set; get; }
        public string AliasOfService { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
    }
}
