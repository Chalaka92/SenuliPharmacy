using System.Collections.Generic;

namespace Domain
{
    public class District
    {
        public int Id { get; set; }
        public int ProvinceId { get; set; }
        public string Name { get; set; }
        public virtual Province Province { get; set; }
    }
}