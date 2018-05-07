using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QUANLYBANHANG.Models;
using QUANLYBANHANG.Models.CustomEntity;
using QUANLYBANHANG.Models.Entity;

namespace QUANLYBANHANG.Controllers
{
    public class RoomAPIController : Controller
    {
        private readonly AccessContext _context;
        public RoomAPIController(AccessContext context)
        {
            _context = context;
        }
        // lấy thông tin phòng hiện tại.
        [HttpPost]
        public object getRoomGoing()
        {
            Message message = new Message { Error = false };
            try
            {
                message.Title = "SUCCESS";
                message.Results = _context.getInfoOfRoomGoing.FromSql(PROC.procGetInfoRoomGoing).ToList();
            }
            catch (Exception ex)
            {
                message.Title = "ERROR";
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
        }
        public class ParametergetRoomDetailGoing
        {
            public int Id { get; set; }
            public string Alias { get; set; }
            public string AliasOfPayLoad { get; set; }
        }
        // lấy thông tin chi tiet phòng hiện tại.
        [HttpPost]
        public object getRoomDetailGoing([FromBody] ParametergetRoomDetailGoing item)
        {
            Message message = new Message { Error = false };
            try
            {
                message.Title = "SUCCESS";
                SqlParameter[] parameters =
                        {
                            new SqlParameter("Alias",SqlDbType.VarChar, 8){ Value = item.Alias }
                        };
                var result = _context.getInfoDetailRoomGoing.FromSql(PROC.procgetInfoDetailInGoingRoom, parameters).SingleOrDefault();
                var datetime = DateTime.Now - (DateTime)result.StartTime;
                result.CaculatorTime = ConvertTimeToString.convertTime(datetime.Days, datetime.Hours, datetime.Minutes);
                objectTinhTien objects = new objectTinhTien {
                    Alias = item.AliasOfPayLoad,
                    StartTime = result.StartTime,
                    EndTime = DateTime.Now
                };
                result.CaculatorPrice = tinhTien(objects);
                message.Results = result;
            }
            catch (Exception ex)
            {
                message.Title = "ERROR";
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
        }
        // lấy thông tin dich vu phòng hiện tại.
        [HttpPost]
        public object getRoomService()
        {
            Message message = new Message { Error = false };
            try
            {
                message.Title = "SUCCESS";
                message.Results = _context.GetInfoService.FromSql(PROC.procGetInfoService).ToList();
            }
            catch (Exception ex)
            {
                message.Title = "ERROR";
                message.Error = true;
                message.Results = ex;
            }
            return Json(message);
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

        public int getMaxPrice()
        {
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
                        command.CommandText = PROC.funcGetMaxPrice;
                        var result = Convert.ToUInt64(command.ExecuteScalar());
                        connection.Close();
                        return (int)result;
                    }
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        [HttpPost]
        public object InsertRoomGoing([FromBody] room_going item)
        {
            Message message = new Message { Error = false };
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    if (item.StartTime.HasValue)
                    {
                        item.StartTime = item.StartTime.Value.ToLocalTime();
                    }
                    if (connection != null && connection.State == ConnectionState.Closed)
                    {
                        connection.Open();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        SqlParameter[] parameters =
                        {
                            new SqlParameter("AliasOfRoom",SqlDbType.VarChar, 8){ Value = item.Alias },
                            new SqlParameter("AliasOfPayLoad",SqlDbType.VarChar, 8){ Value = item.AliasOfPayLoad },
                            new SqlParameter("StartTime",SqlDbType.DateTime){ Value = Convert.ToDateTime(item.StartTime).ToString("yyyy-MM-dd HH:mm")},
                            new SqlParameter("EndTime",SqlDbType.DateTime){ Value =  Convert.ToDateTime(item.StartTime).ToString("yyyy-MM-dd HH:mm")},
                            new SqlParameter("listOfService",SqlDbType.NText){ Value =  item.listOfService},
                            new SqlParameter("Order",SqlDbType.TinyInt, 10){ Value = 1},
                            new SqlParameter("CreatedBy",SqlDbType.VarChar, 25){ Value =  "Admin"},
                            new SqlParameter("ModifiedBy",SqlDbType.VarChar, 25){ Value =  "Admin"},
                            new SqlParameter("StatusDisplay",SqlDbType.TinyInt, 10){ Value =  1},
                        };
                        command.CommandText = PROC.procinsertInGoingRoom;
                        command.Parameters.AddRange(parameters);
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Thêm mới đặt phòng thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Title = "Thêm mới đặt phòng không thành công";
                message.Results = ex;
            }
            return Json(message);
        }
        [HttpPost]
        public object UpdateRoomGoing([FromBody] room_going item)
        {
            Message message = new Message { Error = false };
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    if (item.StartTime.HasValue)
                    {
                        item.StartTime = item.StartTime.Value.ToLocalTime();
                    }
                    if (connection != null && connection.State == ConnectionState.Closed)
                    {
                        connection.Open();
                    }
                    using (var command = connection.CreateCommand())
                    {
                        SqlParameter[] parameters =
                        {
                            new SqlParameter("Id",SqlDbType.Int, 10){ Value = item.Id },
                            new SqlParameter("AliasOfRoom",SqlDbType.VarChar, 8){ Value = item.Alias },
                            new SqlParameter("AliasOfPayLoad",SqlDbType.VarChar, 8){ Value = item.AliasOfPayLoad },
                            new SqlParameter("StartTime",SqlDbType.DateTime){ Value = Convert.ToDateTime(item.StartTime).ToString("yyyy-MM-dd HH:mm")},
                            new SqlParameter("listOfService",SqlDbType.NText){ Value =  item.listOfService},
                            new SqlParameter("ModifiedBy",SqlDbType.VarChar, 25){ Value =  "Admin"},
                            new SqlParameter("StatusDisplay",SqlDbType.TinyInt, 10){ Value =  1},
                        };
                        command.CommandText = PROC.procupdateInGoingRoom;
                        command.Parameters.AddRange(parameters);
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Cập nhật đặt phòng thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Title = "Cập nhật đặt phòng không thành công";
                message.Results = ex;
            }
            return Json(message);
        }
        [HttpPost]
        public object UpdatePayLoad([FromBody] room_history item)
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
                        if (item.StartTime.HasValue)
                        {
                            item.StartTime = item.StartTime.Value.ToLocalTime();
                        }
                        SqlParameter[] parameters =
                        {
                            new SqlParameter("Alias",SqlDbType.VarChar, 8){ Value = item.AliasOfRoom },
                            new SqlParameter("AliasOfPayLoad",SqlDbType.VarChar, 8){ Value = item.AliasOfPayLoad },
                            new SqlParameter("PriceOfService",SqlDbType.Int){ Value = item.PriceOfService },
                            new SqlParameter("StartTime",SqlDbType.DateTime){ Value = Convert.ToDateTime(item.StartTime).ToString("yyyy-MM-dd HH:mm") },
                            new SqlParameter("EndTime",SqlDbType.DateTime){ Value = DateTime.Now.ToString("yyyy-MM-dd HH:mm") },
                            new SqlParameter("PriceOfRoom",SqlDbType.Int){ Value = item.PriceOfRoom},
                            new SqlParameter("ListOfService",SqlDbType.NText){ Value =  item.ListOfService},
                            new SqlParameter("CreatedBy",SqlDbType.VarChar, 25){ Value =  "Admin"},
                            new SqlParameter("ModifiedBy",SqlDbType.VarChar, 25){ Value =  "Admin"},
                            new SqlParameter("StatusDisplay",SqlDbType.TinyInt, 10){ Value =  1},
                        };
                        command.CommandText = PROC.procinsertInRoomHistory;
                        command.Parameters.AddRange(parameters);
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Thanh toán thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Title = "Thanh toán không thành công";
                message.Results = ex;
            }
            return Json(message);
        }
        [HttpPost]
        public object DestroyRoomGoing([FromBody] room_history item)
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
                        SqlParameter[] parameters =
                        {
                            new SqlParameter("Id",SqlDbType.Int){ Value = item.Id },
                            new SqlParameter("AliasOfRoom",SqlDbType.VarChar, 8){ Value = item.AliasOfRoom },
                            new SqlParameter("StatusDisplay",SqlDbType.TinyInt, 10){ Value =  1}
                        };
                        command.CommandText = PROC.procDestroyRoomGoing;
                        command.Parameters.AddRange(parameters);
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Hủy phòng thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Title = "Hủy phòng không thành công";
                message.Results = ex;
            }
            return Json(message);
        }
        [HttpPost]
        public object RollBackRoomGoing([FromBody] room_history item)
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
                        SqlParameter[] parameters =
                        {
                            new SqlParameter("AliasOfRoom",SqlDbType.VarChar, 8){ Value = item.AliasOfRoom },
                            new SqlParameter("StatusDisplay",SqlDbType.TinyInt, 10){ Value =  1}
                        };
                        command.CommandText = PROC.procRollBackInRoomGoing;
                        command.Parameters.AddRange(parameters);
                        var result = command.ExecuteScalar();
                        message.Title = result.ToString();
                        message.Results = Convert.ToInt32(result.ToString());
                        message.Title = "Tính lại tiền phòng trước đó thành công.";
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                message.Error = true;
                message.Title = "Tính lại tiền phòng trước đó không thành công";
                message.Results = ex;
            }
            return Json(message);
        }
        public class objectTinhTien
        {
            public DateTime? StartTime { get; set; }
            public DateTime? EndTime { get; set; }
            public string Alias { get; set; }
        }

        public int tinhTien(objectTinhTien item)
        {
            int total = 0;
            if (item.Alias == "TN")
            {
                var datetime = DateTime.Now - (DateTime)item.StartTime;
                var hour = datetime.Hours;
                if (datetime.Minutes > 10)
                    hour++;
                total = tinhTienTheoNgay(item.Alias, datetime.Days, hour);
            }
            else if (item.Alias == "TG")
            {
                var datetime = DateTime.Now - (DateTime)item.StartTime;
                var hour = datetime.Hours;
                if (datetime.Minutes > 10)
                    hour++;
                total = tinhTienTheoGio(item.Alias, datetime.Days, hour);
            }
            else if (item.Alias == "QD")
            {
                var datetime = DateTime.Now - (DateTime)item.StartTime;
                var hour = datetime.Hours;
                if (datetime.Minutes > 10)
                    hour++;
                total = tinhTienQuaDem(item.Alias, datetime.Days, hour, (DateTime)item.StartTime,DateTime.Now);
            }
            return total;
        }
        public int tinhTienTheoNgay(string alias, int day, int hours)
        {
            int total = 0;
            try
            {
                if (day == 0)
                {
                    return tinhTienTheoGio("TG", day, hours);
                }
                SqlParameter[] parameters =
                {
                   new SqlParameter("AliasOfPrice",SqlDbType.VarChar, 8){ Value = alias }
                };
                var result = _context.getDetailPayLoad.FromSql(PROC.procgetDetailPayLoad, parameters).ToList();
                var time = 0;
                int max = getMaxPrice();
                foreach (var item in result)
                {
                    if (item.ToDay != null)
                    {
                        if (day > 0)
                        {
                            total = day * item.Price;
                        }
                    }
                    if (item.ToHours != null)
                    {
                        int compare = 0;
                        if (hours > 0)
                        {
                            if (item.ToHours != null)
                            {
                                time = hours - (int)item.ToHours;
                                if (time > 0)
                                {
                                    hours = hours - (int)item.ToHours;
                                    compare = (int)item.ToHours * item.Price;
                                }
                                else
                                {
                                    compare = (int)hours * item.Price;
                                }
                            }
                        }
                        if (compare > max)
                        {
                            compare = max;
                        }
                        total = total + compare;
                    }
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
            return total;
        }
        public int tinhTienTheoGio(string alias, int day, int hours)
        {
            int total = 0;
            try
            {
                if (day > 0)
                {
                    return tinhTienTheoNgay("TN", day, hours);
                }

                SqlParameter[] parameters =
                {
                   new SqlParameter("AliasOfPrice",SqlDbType.VarChar, 8){ Value = alias }
                };
                var result = _context.getDetailPayLoad.FromSql(PROC.procgetDetailPayLoad, parameters).ToList();
                int compare = 0;
                foreach (var item in result)
                {
                    if (item.ToHours != null)
                    {
                        if (hours > 0)
                        {
                            if (item.ToHours != null)
                            {
                               
                                if (hours > 0)
                                {
                                    if (hours > item.ToHours)
                                    {
                                        compare += (int)item.ToHours * item.Price;
                                    }
                                    else
                                    {
                                        compare += hours * item.Price;
                                    }
                                }
                                hours = hours - (int)item.ToHours;
                            }
                        }
                    }
                }
                int max = getMaxPrice();
                if (compare > max)
                {
                    compare = max;
                }
                total = total + compare;
            }
            catch (Exception ex)
            {
                return 0;
            }
            return total;
        }
        public int tinhTienQuaDem(string alias, int day, int hours, DateTime startTime, DateTime endTime)
        {
            int total = 0;
            try
            {
                if (day > 0)
                {
                    return tinhTienTheoNgay("TN", day, hours);
                }
                SqlParameter[] parameters =
                {
                   new SqlParameter("AliasOfPrice",SqlDbType.VarChar, 8){ Value = alias }
                };
                var result = _context.getDetailPayLoad.FromSql(PROC.procgetDetailPayLoad, parameters).ToList();
                var kiemTraVoiTinhGio = tinhTienTheoGio("TG", day, hours);
                var time = new TimeSpan();
                int max = getMaxPrice();
                var compare = 0;
                foreach (var item in result)
                {
                    if (item.StartDate != null)
                    {
                        if (endTime < item.StartDate)
                        {
                            return tinhTienTheoGio("TG", day, hours);
                        }
                    }
                    if (item.StartDate != null && item.EndDate != null)
                    {
                        var d = Convert.ToDateTime(item.StartDate).Hour;
                        var m = Convert.ToDateTime(item.StartDate).Minute;
                        var d1 = Convert.ToDateTime(item.EndDate).Hour;
                        var m1 = Convert.ToDateTime(item.EndDate).Minute;
                        item.StartDate = DateTime.Now.Date + new TimeSpan(d,m,0);
                        item.EndDate = (DateTime.Now).Date.AddDays(1) + new TimeSpan(d1, m1, 0);
                        if (item.StartDate > startTime)
                        {
                            time = (DateTime)item.StartDate - startTime;
                        }
                        if (item.EndDate < endTime)
                        {
                            time += endTime - (DateTime)item.EndDate;
                        }
                        compare += item.Price;
                    }
                    if (time != new TimeSpan())
                    {
                        compare += (time.Hours * item.Price);
                    }
                }
                {
                    compare = max;
                }
                total = total + compare;
                if (kiemTraVoiTinhGio < total)
                {
                    total = kiemTraVoiTinhGio;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
            return total;
        }
    }
}