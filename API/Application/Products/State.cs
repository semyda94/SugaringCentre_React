using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Persistence;
using API.Application.Classes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Products {
    public class State {
        public class Query : IRequest<ProductStat> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProductStat> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<ProductStat> Handle(Query request, CancellationToken cancellationToken)
            {
                var oders = await _context.OrderItems.Where(o => o.ProductId == request.Id).ToListAsync();


                return new ProductStat{
                    Id = request.Id,
                    Qty = oders.Sum(o => o.Qty),
                    Amount = oders.Sum( o => o.Amount)
                };
            }
        }
    }
}