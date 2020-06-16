using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Api.Persistence;

namespace Api.Application.ServiceCategories {
    public class Create {
        public class Command : IRequest<Unit> {
            public int ServiceCategoryId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var newCategory = new ServiceCategory{
                    Title = request.Title,
                    Description = request.Description
                };

                _context.ServiceCategory.Add(newCategory);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Error during saving new Service Category");
            }
        }

    }
}