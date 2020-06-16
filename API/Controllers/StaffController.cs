using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Application.Classes;
using Api.Application.Staffs;
using Api.Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StaffController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Staff>>> List() {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Staff>> Details(int id) {
            return await Mediator.Send(new Details.Query {Id = id});
        }

        [HttpGet("workingdays/{id}")]
        public async Task<ActionResult<List<int>>> WorkingDays(int id) {
            return await Mediator.Send(new WorkingDays.Query {StaffId = id});
        }

        [HttpGet("timeoptions/{staffId}/{serviceId}/{date}")]
        public async Task<ActionResult<List<TimeOption>>> TimeOptions(int staffId, int serviceId, DateTime date) {
            return await Mediator.Send(new TimeOptions.Query {StaffId = staffId, ServiceId = serviceId, Date = date});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command) {
            command.StaffId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id) {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}