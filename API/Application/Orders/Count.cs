using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Persistence;
using MediatR;

namespace API.Application.Orders
{
    public class Count
    {
        public class Query : IRequest<int> { }

        public class Command : IRequestHandler<Query, int>
        {
            private readonly DataContext _context;
            public Command(DataContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                return _context.Orders.Count();
            }
        }
    }
}