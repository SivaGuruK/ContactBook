namespace backend.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email  { get; set; }

        public int? PhoneNumber { get; set; }
        public int? Age { get; set; }
        public string? Address { get; set; }
    }
}
