using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class ServiceCategoryController : BaseController {
        [HttpGet]
        public async Task<ActionResult<List<ServiceCategory>>> List () {
            return await Mediator.Send (new Application.ServiceCategories.List.Query ());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Application.ServiceCategories.Create.Command command) {
            return await Mediator.Send (command);
        }

        [HttpDelete ("{id}")]

        public async Task<ActionResult<Unit>> Delete (int id) {
            return await Mediator.Send (new Application.ServiceCategories.Delete.Command { serviceCategoryId = id });
        }

        [HttpPut ("{id}")]
        public async Task<ActionResult<Unit>> Edit (int id, Application.ServiceCategories.Edit.Command command) {
            command.ServiceCategoryId = id;
            return await Mediator.Send (command);
        }
    }
}