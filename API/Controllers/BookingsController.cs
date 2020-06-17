using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingsController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(API.Application.Bookings.Create.Command booking) {
            return await Mediator.Send(booking);
        }
    }
}