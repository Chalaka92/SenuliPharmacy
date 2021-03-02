using System.Collections.Generic;

namespace Domain
{
    public class StatusType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Status> Statuses { get; set; }
    }
}