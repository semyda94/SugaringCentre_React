using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Persistence;
using MediatR;

namespace API.Application.Orders
{
    public class Amount
    {
        public class Query : IRequest<decimal> { }

        public class Handler : IRequestHandler<Query, decimal>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<decimal> Handle(Query request, CancellationToken cancellationToken)
            {
                return _context.Orders.Sum(x => x.Amount);
            }
        }
    }
}