using System.Threading.Tasks;
using Api.Application.User;
using Api.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query) {
            return await Mediator.Send(query);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Unit>> Register(Register.Command command) {
            return await Mediator.Send(command);
        }
    }
}