using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using static Application.Staffs.Create;

namespace Application.Staffs {
    public class Create {
        public class Command : IRequest {
            public int StaffId { get; set; }
            public string Username { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Title { get; set; }
            public DateTime? Dob { get; set; }
            public string WorkingDaysOfWeek { get; set; }
            public DateTime? WorkingFrom { get; set; }
            public DateTime? WorkingTo { get; set; }
            public string servicesStaff { get; set; }
            public ICollection<Domain.StaffImage> StaffImage { get; set; }
        }
    }

    public class Handler : IRequestHandler<Command> {
        private readonly DataContext _context;

        public Handler (DataContext context) {
            _context = context;
        }

        public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
            var staff = new Domain.Staff {
                StaffId = 0,
                Username = request.Username,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Title = request.Title,
                Dob = request.Dob,
                WorkingDaysOfWeek = request.WorkingDaysOfWeek,
                WorkingFrom = request.WorkingFrom,
                WorkingTo = request.WorkingTo
            };

            _context.Staff.Add (staff);

            _context.SaveChanges ();

            foreach (var image in request.StaffImage) {
                _context.StaffImage.Add (new Domain.StaffImage {
                    StaffId = staff.StaffId,
                    Image = image.Image
                });
            }

            var services = request.servicesStaff.Split (',', StringSplitOptions.RemoveEmptyEntries);

            foreach (var service in services) {
                _context.ServiceStaff.Add(new Domain.ServiceStaff {
                    StaffId = staff.StaffId,
                    ServiceId = Int16.Parse (service)
                });
            }

            var success = await _context.SaveChangesAsync () > 0;

            if (success) return Unit.Value;

            throw new Exception ("Error during creating staff");
        }
    }
}