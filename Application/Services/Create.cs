using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Services {
    public class Create {
        public class Command : IRequest<Unit> {
            public int ServiceId { get; set; }
            public int ServiceCategoryId { get; set; }
            public string Title { get; set; }
            public string Desc { get; set; }
            public int Duration { get; set; }
            public decimal Price { get; set; }
            public string Image { get; set; }
            public int SelectedStaff { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var newService = new Service {
                    ServiceCategoryId = request.ServiceCategoryId,
                    Title = request.Title,
                    Desc = request.Desc,
                    Duration = request.Duration,
                    Price = request.Price,
                    Image = request.Image
                };

                _context.Services.Add(newService);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new System.Exception("Error during saving a new Service");
            }
        }
    }
}