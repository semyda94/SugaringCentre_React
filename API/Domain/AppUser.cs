using Microsoft.AspNetCore.Identity;

namespace Api.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}