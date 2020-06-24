using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using Api.Domain;
using Api.Persistence;
using MediatR;

namespace API.Application.Bookings
{
    public class Details
    {
        public class Query : IRequest<Booking>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Booking>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Booking> Handle(Query request, CancellationToken cancellationToken)
            {
                var booking = await _context.Bookings.FindAsync(request.Id);

                if (booking == null) {
                    throw new RestException(HttpStatusCode.NotFound);
                }

                return booking;
            }
        }
    }
}