using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;
using static Api.Application.Staffs.Edit;

namespace Api.Application.Staffs {
    public class Edit {
        public class Command : IRequest {
            public int StaffId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Title { get; set; }
            public DateTime? Dob { get; set; }
            public string WorkingDaysOfWeek { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
        private readonly DataContext _context;

        public Handler (DataContext context) {
            _context = context;
        }

        public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
            var staff = await _context.Staff.FindAsync(request.StaffId);

            if (staff == null)
                throw new RestException(HttpStatusCode.NotFound);

            staff.FirstName = request.FirstName ?? staff.FirstName;
            staff.LastName = request.LastName ?? staff.LastName;
            staff.Title = request.Title ?? staff.Title;
            staff.Dob = request.Dob ?? staff.Dob;
            staff.WorkingDaysOfWeek = request.WorkingDaysOfWeek ?? staff.WorkingDaysOfWeek;

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Unit.Value;

            throw new Exception("Problem saving");
        }
    }
    }
}