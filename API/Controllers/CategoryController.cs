using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Application.Categories;
using Api.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoryController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Category>>> List() {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command) {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id) {
            return await Mediator.Send(new Delete.Command{id = id});
        }
    }
}