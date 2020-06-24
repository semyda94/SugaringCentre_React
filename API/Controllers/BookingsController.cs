using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Booking>>> List() {
            return await Mediator.Send(new API.Application.Bookings.List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> Details(int id) {
            return await Mediator.Send(new API.Application.Bookings.Details.Query {Id = id});
        }

        [HttpGet("listforstaff/{id}")]
        public async Task<ActionResult<List<Booking>>> ListForStaff(int id) {
            return await Mediator.Send(new API.Application.Bookings.ListForStaff.Query{StaffId = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, API.Application.Bookings.Edit.Command command) {
            command.BookingId = id;
            return await Mediator.Send(command);
        }
    
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(API.Application.Bookings.Create.Command booking) {
            return await Mediator.Send(booking);
        }
    }
}