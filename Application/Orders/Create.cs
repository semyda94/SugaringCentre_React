using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders {
    public class Create {

        public class Command : IRequest {
            public int OrderId { get; set; }

            public string Client { get; set; }
            public DateTime Date { get; set; }
            public decimal Amount { get; set; }
            public string ExternalId { get; set; }
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }

            public ICollection<OrderItem> OrderItems { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {

                var newOrder = new Order {
                    ExternalId = request.ExternalId,
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        Address = request.Address,
                        Amount = request.Amount,
                        Date = request.Date,
                        Email = request.Email
                };

                _context.Orders.Add(newOrder);

                await _context.SaveChangesAsync();

                foreach (var item in request.OrderItems)
                {
                    _context.OrderItems.Add(new OrderItem{
                        OrderId = newOrder.OrderId,
                        ProductId = item.ProductId,
                        Amount = item.Amount,
                        Name = item.Name,
                        Qty = item.Qty
                    });
                }

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}