using System;
using System.Collections.Generic;

namespace Application.UserDetails
{
    public class UserDetailDto
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string UserCode { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string NIC { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string LoggedUserId { get; set; }
        public string DisplayAddress { get; set; }
        public virtual ICollection<UserAddressDto> UserAddresses { get; set; }
        public virtual ICollection<UserEmailDto> UserEmails { get; set; }
        public virtual ICollection<UserContactDto> UserContacts { get; set; }
    }
}