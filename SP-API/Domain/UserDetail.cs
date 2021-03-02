using System;
using System.Collections.Generic;

namespace Domain
{
    public class UserDetail
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string UserCode { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string NIC { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string LoggedUserId { get; set; }
        public virtual ICollection<UserAddress> UserAddresses { get; set; }
        public virtual ICollection<UserEmail> UserEmails { get; set; }
        public virtual ICollection<UserContact> UserContacts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

    }
}