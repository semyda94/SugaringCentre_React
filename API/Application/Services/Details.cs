using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using Api.Domain;
using MediatR;
using Api.Persistence;

namespace Api.Application.Services {
    public class Details {
        public class Query : IRequest<Service> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Service> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Service> Handle(Query request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FindAsync(request.Id);

                if (service == null)
                    throw new RestException(HttpStatusCode.NotFound);

                return service;
            }
        }
    }
}