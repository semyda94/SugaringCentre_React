using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Application.Orders;
using Api.Domain;
using API.Application.Classes;
using API.Application.Orders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Order>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> Count()
        {
            return await Mediator.Send(new Count.Query());
        }
        
        [HttpGet("amount")]
        public async Task<ActionResult<decimal>> Amount()
        {
            return await Mediator.Send(new Amount.Query());
        }

        [HttpGet("orderscountbarstat")]
        public async Task<ActionResult<ChartData>> OrdersCountBarStat() {
            return await Mediator.Send(new OrdersCountBarChart.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Order order)
        {
            return await Mediator.Send(new Create.Command
            {
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