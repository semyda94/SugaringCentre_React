using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;

namespace Api.Application.Categories
{
    public class Edit
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
                var category = await _context.Categories.FindAsync(request.Id);

                if (category == null)
                    throw new RestException(HttpStatusCode.NotFound);

                category.Name = request.Name ?? category.Name;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem during saving");
            }
        }
    }
}