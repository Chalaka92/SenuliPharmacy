using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<StatusType> StatusTypes { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }
        public DbSet<UserEmail> UserEmails { get; set; }
        public DbSet<UserContact> UserContacts { get; set; }
        public DbSet<ReturnType> ReturnTypes { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemBatch> ItemBatches { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItemBatch> OrderItemBatches { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<District>()
            .HasOne(u => u.Province)
            .WithMany(a => a.Districts)
            .HasForeignKey(u => u.ProvinceId);

            builder.Entity<Status>()
            .HasOne(u => u.StatusType)
            .WithMany(a => a.Statuses)
            .HasForeignKey(u => u.StatusTypeId);

            builder.Entity<UserAddress>()
           .HasOne(u => u.UserDetails)
           .WithMany(a => a.UserAddresses)
           .HasForeignKey(u => u.UserId);

            builder.Entity<UserEmail>()
           .HasOne(u => u.UserDetails)
           .WithMany(a => a.UserEmails)
           .HasForeignKey(u => u.UserId);

            builder.Entity<UserContact>()
           .HasOne(u => u.UserDetails)
           .WithMany(a => a.UserContacts)
           .HasForeignKey(u => u.UserId);

            builder.Entity<Item>()
           .HasOne(u => u.ItemCategory)
           .WithMany(a => a.Items)
           .HasForeignKey(u => u.CategoryId);

            builder.Entity<ItemBatch>()
           .HasOne(u => u.Item)
           .WithMany(a => a.ItemBatches)
           .HasForeignKey(u => u.ItemId);

            builder.Entity<ItemBatch>()
            .HasOne(u => u.Status)
            .WithMany(a => a.ItemBatches)
            .HasForeignKey(u => u.ItemStatusId);

            builder.Entity<OrderItemBatch>()
              .HasOne(u => u.Order)
              .WithMany(a => a.OrderItemBatches)
              .HasForeignKey(u => u.OrderId);

            builder.Entity<OrderItemBatch>()
           .HasOne(u => u.ItemBatch)
           .WithMany(a => a.OrderItemBatches)
           .HasForeignKey(u => u.ItemBatchId);

            builder.Entity<Order>()
            .HasOne(u => u.UserDetail)
            .WithMany(a => a.Orders)
            .HasForeignKey(u => u.UserId);

        }
    }
}
