using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using Api.Persistence;
using MediatR;

namespace API.Application.Bookings
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bookingToDelete = await _context.Bookings.FindAsync(request.Id);

                if (bookingToDelete == null) {
                    throw new RestException(HttpStatusCode.NotFound); 
                }

                _context.Bookings.Remove(bookingToDelete);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                
                throw new System.Exception("Problem saving changes");
            }
        }
    }
}