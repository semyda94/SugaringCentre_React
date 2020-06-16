using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Products {
    public class Edit {
        public class Command : IRequest {
            public int ProductId { get; set; }
            public string Title { get; set; }
            public string Desc { get; set; }
            public string ShortDescription { get; set; }
            public decimal Price { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;

            public Handler (DataContext context) {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.ProductId);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound);

                product.Title = request.Title;
                product.Price = request.Price;
                product.Desc = request.Desc;
                product.ShortDescription = request.ShortDescription;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem during saving");
            }
        }
    }
}