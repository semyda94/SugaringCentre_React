using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Api.Persistence;

namespace Api.Application.Categories
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = new Category {
                    Name = request.Name
                };

                _context.Categories.Add(category);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                
                throw new Exception("Problems during saving");
            }
        }
    }
}