namespace Domain
{
    public class OrderItemBatch
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ItemBatchId { get; set; }
        public string OrderItemBatchCode { get; set; }
        public string Name { get; set; }
        public int ItemCount { get; set; }
        public decimal ItemPrice { get; set; }
        public decimal ShopOwnerDiscountRate { get; set; }
        public decimal NetPrice { get; set; }
        public decimal TotalNetPrice { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
        public virtual Order Order { get; set; }
    }
}