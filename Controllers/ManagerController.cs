using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QUANLYBANHANG.Models;
using QUANLYBANHANG.Models.CustomEntity;
using QUANLYBANHANG.Models.Entity;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QUANLYBANHANG.Controllers
{
    public class ManagerController : Controller
    {
        private readonly AccessContext _context;
        public ManagerController(AccessContext context)
        {
            _context = context;
        }
        // lấy thông tin hình thức tính tiền.
        [HttpPost]
        public object getListPayLoad()
        {
            Message message = new Message { Error = false };
            try
            {
                message.Title = "SUCCESS";
                message.Results = _context.getInfoPayLoad.FromSql(PROC.procGetListPalyLoad).ToList();
            }
            catch (Exception ex)
            {
                message.Title = "ERROR";
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
        }
        public class objectgetDetailPayLoad
        {
            public string AliasOfRoom { get; set; }
        }
        [HttpPost]
        public object getDetailPayLoad([FromBody] objectgetDetailPayLoad item)
        {
            Message message = new Message { Error = false };
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("AliasOfPrice",SqlDbType.VarChar, 8){ Value = item.AliasOfRoom }
                };
                var result = _context.getDetailPayLoad.FromSql(PROC.procgetDetailPayLoad, parameters).ToList();
                message.Results = result;
                return Json(message);
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Results = ex;
                return Json(message);
            }

        }
        [HttpPost]
        public object updateService([FromBody] List<room_service> item)
        {
            Message message = new Message { Error = false };
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    if (connection != null && connection.State == ConnectionState.Closed)
                    {
                        connection.Open();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        var stringQuery = "DECLARE @tableINUPService tableINUPService ";
                        foreach (var objects in item)
                        {
                            stringQuery += "INSERT INTO @tableINUPService(Alias,Title,Price) VALUES(N'" + objects.Alias + "',N'" + objects.Title + "'," + objects.Price + ") ";
                        }
                        stringQuery += "EXEC [Sp_updateOfService] @tableINUPService";
                        command.CommandText = stringQuery;
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Cập nhật dịch vụ thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Title = "Cập nhật dịch vụ không thành công";
                message.Results = ex;
            }
            return Json(message);
        }
        [HttpPost]
        public object insertService([FromBody] List<room_service> item)
        {
            Message message = new Message { Error = false };
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    if (connection != null && connection.State == ConnectionState.Closed)
                    {
                        connection.Open();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        var stringQuery = "DECLARE @tableINUPService tableINUPService ";
                        foreach (var objects in item)
                        {
                            stringQuery += "INSERT INTO @tableINUPService(Alias,Title,Price) VALUES(N'" + objects.Alias + "',N'" + objects.Title + "'," + objects.Price + ") ";
                        }
                        stringQuery += "EXEC [Sp_insertOfService] @tableINUPService";
                        command.CommandText = stringQuery;
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Cập nhật dịch vụ thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                if (message.Title == "EXISTS")
                {
                    message.Title = "Mã dịch vụ đã tồn tại";
                }
                else
                {
                    message.Title = "Cập nhật dịch vụ không thành công";
                }
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
        }
        [HttpPost]
        public object updatePayLoad([FromBody] List<payload_priceDetails> item)
        {
            Message message = new Message { Error = false };
            try
            {
                foreach (var objects in item)
                {
                    if (objects.ToDay == null) objects.ToDay = 0;
                    if (objects.ToHours == null) objects.ToHours = 0;
                    if (objects.Status == 0)
                    {
                        objects.ToDay = 0;
                        objects.ToHours = 0;
                        if (objects.StartDate.HasValue) objects.StartDate = objects.StartDate.Value.ToLocalTime();
                        if (objects.EndDate.HasValue) objects.EndDate = objects.EndDate.Value.ToLocalTime();
                    }
                    else
                    {
                        objects.StartDate = null;
                        objects.EndDate = null;
                    }
                }
                using (var connection = _context.Database.GetDbConnection())
                {
                    if (connection != null && connection.State == ConnectionState.Closed)
                    {
                        connection.Open();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        var stringQuery = "DECLARE @payload_priceDetails payload_priceDetails ";
                        foreach (var objects in item)
                        {
                            if (objects.Status == 0)
                            {
                                stringQuery += "INSERT INTO @payload_priceDetails(Id,StartDate,EndDate,ToDay,ToHours,Price) VALUES(" + objects.Id + ",'" + objects.StartDate + "','" + objects.EndDate + "'," + objects.ToDay + "," + objects.ToHours + "," + objects.Price + ") ";
                            }
                            else
                            {
                                stringQuery += "INSERT INTO @payload_priceDetails(Id,ToDay,ToHours,Price) VALUES(" + objects.Id + "," + objects.ToDay + "," + objects.ToHours + "," + objects.Price + ") ";
                            }
                        }
                        stringQuery += "EXEC [Sp_updatePayLoad] @payload_priceDetails";
                        command.CommandText = stringQuery;
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Cập nhật thanh toán thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Title = "Cập nhật thanh toán không thành công.";
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
        }
        public class entityreport
        {
            public DateTime startTime { get; set; }
            public DateTime endTime { get; set; }
        }
        [HttpPost]
        public object report([FromBody] entityreport item)
        {
            Message message = new Message { Error = false };
            try
            {
                item.startTime = item.startTime.ToLocalTime();
                item.endTime = item.endTime.ToLocalTime();
                int startTime = 0;
                int endTime = 0;
                var stringStartTime = Convert.ToDateTime(item.startTime).AddDays(-1).ToString("yyyyMMdd");
                var stringEndTime = Convert.ToDateTime(item.endTime).AddDays(1).ToString("yyyyMMdd");
                startTime = Convert.ToInt32(stringStartTime);
                endTime = Convert.ToInt32(stringEndTime);
                SqlParameter[] parameters =
                {
                    new SqlParameter("startTime",SqlDbType.Int, 19){ Value = startTime },
                    new SqlParameter("endTime",SqlDbType.Int, 19){ Value = endTime }
                };
                List<ReportToDate> returns = new List<ReportToDate>();
                bool check = false;
                int indexCheck = 0;
                while (!check)
                {
                    var t  = Convert.ToDateTime(item.startTime).AddDays(indexCheck).ToString("yyyyMMdd");
                    if(t != stringEndTime)
                    {
                        ReportToDate obj = new ReportToDate
                        {
                            Date = (Convert.ToDateTime(item.startTime).Date.AddDays(indexCheck)) + new TimeSpan(0, 0, 0),
                            Id = indexCheck + 1,
                            Number = 0,
                            Price = 0
                        };
                        obj.IndicatorDate = Convert.ToInt32((Convert.ToDateTime(item.startTime).Date.AddDays(indexCheck)).ToString("yyyyMMdd"));
                        obj.IndicatorMonth = Convert.ToDateTime(item.startTime).Date.AddDays(indexCheck).Month;
                        var year = Convert.ToUInt16(obj.IndicatorDate.ToString().Substring(0, 4));
                        var month = Convert.ToUInt16(obj.IndicatorDate.ToString().Substring(4, 2));
                        var date = Convert.ToUInt16(obj.IndicatorDate.ToString().Substring(6, 2));
                        if (new DateTime(year, month, date).DayOfWeek.ToString() == "Saturday")
                        {
                            obj.Day = "Thứ 7";
                        }
                        else if (new DateTime(year, month, date).DayOfWeek.ToString() == "Sunday")
                        {
                            obj.Day = "Chủ nhật";
                        }
                        else if (new DateTime(year, month, date).DayOfWeek.ToString() == "Monday")
                        {
                            obj.Day = "Thứ 2";
                        }
                        else if (new DateTime(year, month, date).DayOfWeek.ToString() == "Tuesday")
                        {
                            obj.Day = "Thứ 3";
                        }
                        else if (new DateTime(year, month, date).DayOfWeek.ToString() == "Wednesday")
                        {
                            obj.Day = "Thứ 4";
                        }
                        else if (new DateTime(year, month, date).DayOfWeek.ToString() == "Thursday")
                        {
                            obj.Day = "Thứ 5";
                        }
                        else if (new DateTime(year, month, date).DayOfWeek.ToString() == "Friday")
                        {
                            obj.Day = "Thứ 6";
                        }
                        indexCheck++;
                        returns.Add(obj);
                    }
                    else{
                        check = true;
                    }
                }
                var result = _context.ReportToDate.FromSql(PROC.procReportToDate, parameters).ToList();
                foreach (var doiTuong in result)
                {
                    var ketQua = returns.Find(x => x.IndicatorDate == doiTuong.IndicatorDate);
                    if(ketQua != null)
                    {
                        ketQua.Number = doiTuong.Number;
                        ketQua.Price = doiTuong.Price;
                    }
                }
                message.Results = returns;
                return Json(message);
            }
            catch (Exception ex)
            {
                message.Title = "Xảy ra lỗi khi thống kê";
                message.Error = true;
                message.Results = ex;
                return Json(message);
            }
        }
        public class entityDetail
        {
            public int date { get; set; }
        }
        public object detailReport([FromBody] entityDetail item)
        {
            Message message = new Message { Error = false };
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("startTime",SqlDbType.Int, 19){ Value = item.date },
                };
                var result = _context.DetailHistoryOfRoom.FromSql(PROC.procDetailHistory, parameters).ToList();
                message.Results = result;
                return Json(message);
            }
            catch (Exception ex)
            {
                message.Title = "Xảy ra lỗi khi thống kê chi tiết";
                message.Error = true;
                message.Results = ex;
                return Json(message);
            }
        }
        public class objectTime
        {
            public int Id { get; set; }
            public string Day { get; set; }
            public int Date { get; set; }
            public int Month { get; set; }
            public bool? status { get; set; }
            public string FullDate { get; set; }
        }
        public class objectTimeRequest
        {
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
        }
        public object genereateCarlendar([FromBody] objectTimeRequest item)
        {
            Message message = new Message
            {
                Error = false
            };
            try
            {
                var start = item.StartTime.DayOfWeek.ToString();
                item.StartTime = item.StartTime.AddDays(CacurlatorconvertDate(start));
                var between = (item.EndTime - item.StartTime).Days;
                List<objectTime> danhSach = new List<objectTime>();
                List<object> results = new List<object>();
                for (var i = 0; i <= between; i++)
                {
                    objectTime doituong = new objectTime
                    {
                        Id = i + 1,
                        Date = (Convert.ToDateTime(item.StartTime)).AddDays(i).Day,
                        Day = convertDay(Convert.ToDateTime(item.StartTime).AddDays(i).DayOfWeek.ToString()),
                        Month = Convert.ToDateTime(item.StartTime).AddDays(i).Month,
                        status = false,
                        FullDate = item.StartTime.Date.AddDays(i).ToString("yyyy-MM-dd ") + new TimeSpan(0,0,0)
                    };
                    var ketqua = CacurlatorconvertDate(start);
                    if (i < - CacurlatorconvertDate(start))
                    {
                        doituong.status = true;
                    }
                    if (i == 0)
                    {
                        var check = convertDay(Convert.ToDateTime(item.StartTime).AddDays(i).DayOfWeek.ToString());
                    }
                    if(i != 0)
                    {
                        if (doituong.Day == "CN")
                        {
                            results.Add(danhSach);
                            danhSach = new List<objectTime>();
                        }
                    }
                    danhSach.Add(doituong);

                }
                message.Results = results;
            }
            catch (Exception ex)
            {
                message.Title = "Cập nhật thanh toán không thành công.";
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
        }
        public string convertDay(string strings)
        {
            if (strings == "Sunday")
            {
                return "CN";
            }
            else if (strings == "Monday")
            {
                return "T2";
            }
            else if (strings == "Tuesday")
            {
                return "T3";
            }
            else if (strings == "Wednesday")
            {
                return "T4";
            }
            else if (strings == "Thursday")
            {
                return "T5";
            }
            else if (strings == "Friday")
            {
                return "T6";
            }
            else
            {
                return "T7";
            }
        }
        public int CacurlatorconvertDate(string strings)
        {
            if (strings == "Sunday")
            {
                return 0;
            }
            else if (strings == "Monday")
            {
                return -1;
            }
            else if (strings == "Tuesday")
            {
                return -2;
            }
            else if (strings == "Wednesday")
            {
                return -3;
            }
            else if (strings == "Thursday")
            {
                return -4;
            }
            else if (strings == "Friday")
            {
                return -5;
            }
            else
            {
                return -6;
            }
        }
    }
}
