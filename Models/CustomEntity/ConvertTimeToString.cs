using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QUANLYBANHANG.Models.CustomEntity
{
    public class ConvertTimeToString
    {
        // chuyen doi time thanh string
        public static string convertTime(int day,int hours,int minutes)
        {
            string d = "";
            string h = "";
            string m = "";
            if(day != 0)
            {
                d = day + " Ngày ";
            }
            if(hours != 0)
            {
                h = hours + " Giờ ";
            }
            if(minutes != 0)
            {
                m = minutes + " Phút";
            }
            return (d + h + m).Trim();
        }
    }
}
