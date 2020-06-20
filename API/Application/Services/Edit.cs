using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using Api.Persistence;
using MediatR;

namespace API.Application.Services {
    public class Edit {
        public class Command : IRequest<Unit> {
            public int ServiceId { get; set; }
            public int ServiceCategoryId { get; set; }
            public string Title { get; set; }
            public string Desc { get; set; }
            public int Duration { get; set; }
            public decimal Price { get; set; }
            public string Image { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var service = await _context.Services.FindAsync(request.ServiceId);

                if (service == null) {
                    throw new RestException(HttpStatusCode.NotFound);
                }

                service.Title = request.Title;
                service.Desc = request.Desc;
                service.Duration = request.Duration;
                service.Price = request.Price;

                if (request.Image != null)
                    service.Image = request.Image;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new System.Exception("Error during updating service");
            }
        }
    }
}