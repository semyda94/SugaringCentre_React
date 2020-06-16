using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;

namespace Api.Application.ServiceCategories {
    public class Edit {
        public class Command : IRequest<Unit> {
            public int ServiceCategoryId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var categoryToUpdate = await _context.ServiceCategory.FindAsync(request.ServiceCategoryId);

                if (categoryToUpdate == null)
                    throw new RestException(HttpStatusCode.NotFound);

                categoryToUpdate.Title = request.Title;
                categoryToUpdate.Description = request.Description;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Error during saving update service category");
            }
        }
    }
}