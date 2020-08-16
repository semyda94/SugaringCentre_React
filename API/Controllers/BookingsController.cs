using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using API.Application.Classes;
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id) {
            return await Mediator.Send(new API.Application.Bookings.Delete.Command{ Id = id});
        }

        [HttpGet("listforstaff/{id}")]
        public async Task<ActionResult<List<Booking>>> ListForStaff(int id) {
            return await Mediator.Send(new API.Application.Bookings.ListForStaff.Query{StaffId = id});
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> Count () {
            return await Mediator.Send(new API.Application.Bookings.Count.Query());
        }

        [HttpGet("countbarstat")]
        public async Task<ActionResult<ChartData>> BookingsCountBarStat () {
            return await Mediator.Send(new API.Application.Bookings.BookingsCountBarChart.Query());
        }

        [HttpGet("countpermasterstat")]
        public async Task<ActionResult<ChartData>> BookingsCountPerMasterPieStat () {
            return await Mediator.Send(new API.Application.Bookings.BookingsCountPerMasterPieChart.Query());
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