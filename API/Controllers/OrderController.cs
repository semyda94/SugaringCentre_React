using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Orders;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController: BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Order>>> List() {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Order order) {
            return await Mediator.Send(new Create.Command{
                ExternalId = order.ExternalId,
                FirstName = order.FirstName,
                LastName = order.LastName,
                Email = order.Email,
                Address = order.Address,
                Amount = order.Amount,
                Date = order.Date,
                OrderItems = order.OrderItems
            });
        }
    }
}