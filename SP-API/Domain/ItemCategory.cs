using System.Collections.Generic;

namespace Domain
{
    public class ItemCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ItemCategoryCode { get; set; }
        public virtual List<Item> Items { get; set; }
    }
}