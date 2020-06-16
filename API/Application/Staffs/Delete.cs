using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;

namespace Api.Application.Staffs {
    public class Delete {
        public class Command : IRequest {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;

            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var staff = _context.Staff.SingleOrDefault(s => s.StaffId == request.Id);

                if (staff == null)
                    throw new RestException(HttpStatusCode.NotFound);

                _context.Remove(staff);

                var success = await _context.SaveChangesAsync () > 0;

                if (success)
                    return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}