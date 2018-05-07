using Microsoft.EntityFrameworkCore;
using QUANLYBANHANG.Models.CustomEntity;
using QUANLYBANHANG.Models.Entity;
using System.Reflection.Metadata;

namespace QUANLYBANHANG.Models
{
    public class AccessContext : DbContext
    {
        public AccessContext(DbContextOptions<AccessContext> options) : base(options)
        {
        }
        // database
        public DbSet<room_info> room_info { get; set; }
        public DbSet<payload_price> payload_price { get; set; }
        public DbSet<room_service> room_service { get; set; }
        public DbSet<room_going> room_going { get; set; }
        public DbSet<payload_priceDetails> payload_priceDetails { get; set; }
        public DbSet<room_history> room_history { get; set; }
        public DbSet<room_report> room_report { get; set; }

        // custom
        public DbSet<GetInfoService> GetInfoService { get; set; }
        public DbSet<getInfoOfRoomGoing> getInfoOfRoomGoing { get; set; }
        public DbSet<getInfoPayLoad> getInfoPayLoad { get; set; }
        public DbSet<getInfoDetailRoomGoing> getInfoDetailRoomGoing { get; set; }
        public DbSet<getDetailPayLoad> getDetailPayLoad { get; set; }
        public DbSet<ReportToDate> ReportToDate { get; set; }
        public DbSet<DetailHistoryOfRoom> DetailHistoryOfRoom { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<room_info>().ToTable("room_info");
            modelBuilder.Entity<room_info>().ToTable("room_info");
            modelBuilder.Entity<payload_price>().ToTable("payload_price");
            modelBuilder.Entity<room_service>().ToTable("room_service");
            modelBuilder.Entity<room_going>().ToTable("room_going");
            modelBuilder.Entity<payload_priceDetails>().ToTable("payload_priceDetails");
            modelBuilder.Entity<room_history>().ToTable("room_history");
            modelBuilder.Entity<room_report>().ToTable("room_report");
        }
    }
}
