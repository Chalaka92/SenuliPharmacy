namespace Domain
{
    public class UserContact
    {
        public int Id { get; set; }
        public string ContactNo { get; set; }
        public int UserId { get; set; }
        public virtual UserDetail UserDetails { get; set; }
    }
}