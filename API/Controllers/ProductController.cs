using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Application.Products;
using Api.Domain;
using API.Application.Classes;
using API.Application.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> List() {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("stat/{id}")]
        public async Task<ActionResult<ProductStat>> Stat(int id) {
            return await Mediator.Send(new State.Query {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, Edit.Command command) {
            command.ProductId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id) {
            return await Mediator.Send(new Delete.Command{id = id});
        }
    }
}