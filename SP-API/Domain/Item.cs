using System.Collections.Generic;

namespace Domain
{
    public class Item
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string ItemCode { get; set; }
        public string Comment { get; set; }
        public bool IsNew { get; set; }
        public virtual ItemCategory ItemCategory { get; set; }
        public virtual List<ItemBatch> ItemBatches { get; set; }
    }
}