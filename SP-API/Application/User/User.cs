using System.Collections.Generic;

namespace Application.User
{
    public class User
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public IList<string> Roles { get; set; }
    }
}