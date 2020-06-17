using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.Persistence;
using MediatR;

namespace API.Application.Bookings {
    public class Create {
        public class Command : IRequest<Unit> {
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

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) { 
                _context = context;
            }
            

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var booking = new Booking {
                    ServiceId = request.ServiceId,
                    StaffId = request.StaffId,
                    Date = request.Date,
                    Time = request.Time,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Phone = request.Phone
                };

                _context.Bookings.Add(booking);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Error create new booking");
            }
        }
    }
}