using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.ServiceCategories {
    public class Delete {
        public class Command : IRequest {
            public int serviceCategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.ServiceCategory.FindAsync(request.serviceCategoryId);

                if (category == null)
                    throw new RestException(HttpStatusCode.NotFound);

                _context.ServiceCategory.Remove(category);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new System.Exception("Error during save changes for delete Service Category");
            }
        }
    }
}