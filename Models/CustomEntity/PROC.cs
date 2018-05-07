namespace QUANLYBANHANG.Models.CustomEntity
{
    public class PROC
    {
        // lấy thông tin phòng đang sử dụng.
        public static string procGetInfoRoomGoing = "EXECUTE [Sp_getListRoomGoing] ";
        // lấy thông tin phòng đang sử dụng.
        public static string procGetInfoService = "EXECUTE [Sp_getRoomService] ";
        // lấy thông tin danh sách thanh toán.
        public static string procGetListPalyLoad = "EXECUTE [Sp_getListPalyLoad] ";
        // lấy đầy đủ thông tin danh sách thanh toán.
        public static string procGetFullListPayLoad = "EXECUTE [Sp_getFullListPayLoad] ";
        // thêm thông tin danh sách đặt phòng.
        public static string procinsertInGoingRoom = "EXECUTE [Sp_insertInGoingRoom] " +
                                                                            "@AliasOfRoom," +
                                                                            "@StartTime," +
                                                                            "@EndTime," +
                                                                            "@AliasOfPayLoad," +
                                                                            "@listOfService," +
                                                                            "@Order," +
                                                                            "@CreatedBy," +
                                                                            "@ModifiedBy," +
                                                                            "@StatusDisplay";
        // cập nhật thông tin danh sách đặt phòng.
        public static string procupdateInGoingRoom = "EXECUTE [Sp_updateInGoingRoom]" +
                                                                            "@Id," +
                                                                            "@AliasOfRoom," +
                                                                            "@StartTime," +
                                                                            "@AliasOfPayLoad," +
                                                                            "@listOfService," +
                                                                            "@ModifiedBy," +
                                                                            "@StatusDisplay";
        // lấy thông tin chi tiết thanh toán thực hiện thanh toán.
        public static string procgetDetailPayLoad = "EXECUTE [Sp_getDetailPayLoad] " +
                                                                            "@AliasOfPrice";
        // Lay thong tin chi tiet dat phong hien tai.
        public static string procgetInfoDetailInGoingRoom = "EXECUTE [Sp_getInfoDetailInGoingRoom] " +
                                                                            "@Alias";
        // Lay thong tin chi tiet dat phong hien tai.
        public static string funcGetMaxPrice = "SELECT dbo.Func_getMaxPrice()";
        // thanh toán thông tin đặt phòng.
        public static string procinsertInRoomHistory = "EXECUTE [Sp_insertRoom_history]" +
                                                                            "@Alias," +
                                                                            "@AliasOfPayLoad," +
                                                                            "@PriceOfService," +
                                                                            "@PriceOfRoom," +
                                                                            "@StartTime," +
                                                                            "@EndTime," +
                                                                            "@listOfService," +
                                                                            "@CreatedBy," +
                                                                            "@ModifiedBy," +
                                                                            "@StatusDisplay";
        // hủy thông tin đặt phòng.
        public static string procDestroyRoomGoing = "EXECUTE [Sp_destroyRoomGoing]" +
                                                                            "@Id," +
                                                                            "@AliasOfRoom," +
                                                                            "@StatusDisplay";
        // tính lại tiền đặt phòng.
        public static string procRollBackInRoomGoing = "EXECUTE [Sp_rollBackInRoomGoing]" +
                                                                            "@AliasOfRoom," +
                                                                            "@StatusDisplay";
        // cập nhật dịch vụ.
        public static string procupdateOfService = "EXECUTE [Sp_updateOfService]" +
                                                                            "@AliasOfService," +
                                                                            "@Title," +
                                                                            "@Price";
        // thống kê .
        public static string procReportToDate = "EXECUTE [Sp_reportToDate]" +
                                                                            "@startTime," +
                                                                            "@endTime";
        // thống kê chi tiết.
        public static string procDetailHistory = "EXECUTE [Sp_getDetailHistoryOfRoomByIndicatorDate]" +
                                                                            "@startTime";
    }

}
