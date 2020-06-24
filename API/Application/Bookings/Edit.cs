using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using Api.Persistence;
using MediatR;

namespace API.Application.Bookings
{
    public class Edit
    {
        public class Command : IRequest<Unit>
        {
            public int BookingId { get; set; }
            public int ServiceId { get; set; }
            public int StaffId { get; set; }
            public DateTime Date { get; set; }
            public string Time { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var booking = await _context.Bookings.FindAsync(request.BookingId); 

                if (booking == null) {
                    throw new RestException(HttpStatusCode.NotFound);
                }

                booking.Date = request.Date;
                booking.Time = request.Time;
                booking.FirstName = request.FirstName;
                booking.LastName = request.LastName;
                booking.Email = request.Email;
                booking.Phone = request.Phone;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Error during updating booking");
            }
        }
    }
}