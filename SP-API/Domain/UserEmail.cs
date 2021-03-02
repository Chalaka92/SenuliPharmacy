namespace Domain
{
    public class UserEmail
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
        public virtual UserDetail UserDetails { get; set; }
    }
}