using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Api.Persistence;

namespace Api.Application.Staffs {
    public class Details {
        public class Query : IRequest<Domain.Staff> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.Staff> {
            private readonly DataContext _context;

            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Domain.Staff> Handle (Query request, CancellationToken cancellationToken) {
                var staff = await _context.Staff.FindAsync(request.Id);

                return staff;
            }
        }
    }
}