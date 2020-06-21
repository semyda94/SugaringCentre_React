using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingsController : BaseController
    {
        [HttpGet("listforstaff/{id}")]
        public async Task<ActionResult<List<Booking>>> ListForStaff(int id) {
            return await Mediator.Send(new API.Application.Bookings.List.Query{StaffId = id});
        }
    
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(API.Application.Bookings.Create.Command booking) {
            return await Mediator.Send(booking);
        }
    }
}