using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Api.Persistence;

namespace Api.Application.Orders {
    public class List {
        public class Query : IRequest<List<Order>> { }

        public class Handler : IRequestHandler<Query, List<Order>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<Order>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders.ToListAsync();

                return orders;
            }
        }
    }
}