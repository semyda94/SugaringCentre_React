using Api.Domain;

namespace Api.Application.Interfaces
{
    public interface IJwtGenerator
    {
         string CreateToken(AppUser user);
    }
}