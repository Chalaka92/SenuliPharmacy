using System;
using System.Collections.Generic;

namespace Domain
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string OrderCode { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalBillDiscount { get; set; }
        public decimal TotalNetAmount { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? CompletedDate { get; set; }
        public DateTime OrderedDate { get; set; }
        public bool IsEdit { get; set; }
        public DateTime? EditedDate { get; set; }
        public int EditedUserId { get; set; }
        public bool IsCancel { get; set; }
        public DateTime? CanceledDate { get; set; }
        public int CanceledUserId { get; set; }
        public string CanceledReason { get; set; }
        public virtual ICollection<OrderItemBatch> OrderItemBatches { get; set; }
        public virtual UserDetail UserDetail { get; set; }
    }
}