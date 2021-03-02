using System;
using System.Collections.Generic;

namespace Domain
{
    public class ItemBatch
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int ItemStatusId { get; set; }
        public int StockCount { get; set; }
        public int ItemCount { get; set; }
        public int ReorderCount { get; set; }
        public string ItemBatchCode { get; set; }
        public string Name { get; set; }
        public decimal MaxRetailPrice { get; set; }
        public DateTime ManufactureDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public virtual Item Item { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<OrderItemBatch> OrderItemBatches { get; set; }
    }
}