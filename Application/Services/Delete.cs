using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Services {
    public class Delete {
        public class Command : IRequest<Unit> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var service = await _context.Services.FindAsync(request.Id);

                if (service == null)
                    throw new RestException(HttpStatusCode.NotFound);

                _context.Remove(service);

                var success = await _context.SaveChangesAsync() > 0; 

                if (success)
                    return Unit.Value;

                throw new Exception("Error during delte service");
            }
        }

    }
}