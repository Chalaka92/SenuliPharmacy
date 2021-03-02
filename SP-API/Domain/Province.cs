using System.Collections.Generic;

namespace Domain
{
    public class Province
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<District> Districts { get; set; }
    }
}