using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using API.Application.Classes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class ServiceController : BaseController {
        [HttpGet]
        public async Task<ActionResult<List<Service>>> List () {
            return await Mediator.Send (new Api.Application.Services.List.Query ());
        }

        [HttpGet("options")]
        public async Task<ActionResult<List<SelectOptions>>> Options () {
            return await Mediator.Send (new API.Application.Services.Options.Query());
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Service>> Details (int id) {
            return await Mediator.Send(new Api.Application.Services.Details.Query{Id = id});
        }

        [HttpPut ("{id}")]
        public async Task<ActionResult<Unit>> Edit (int id, API.Application.Services.Edit.Command command) {
            return await Mediator.Send(command);
        }

        [HttpGet ("masters/{id}")]
        public async Task<ActionResult<List<Staff>>> Masters (int id) {
            return await Mediator.Send(new Api.Application.Services.Masters.Query{serviceId = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Api.Application.Services.Create.Command command) {
            return await Mediator.Send (command);
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<Unit>> Delete (int id) {
            return await Mediator.Send (new Api.Application.Services.Delete.Command { Id = id });
        }
    }
}