using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;

namespace Api.Application.Products {
    public class Delete {
        public class Command : IRequest {
            public int id { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var productCategories = _context.ProductCategory.Where(x => x.ProductId == request.id).ToList();
                var productImage = _context.ProductImage.Where(x => x.ProductId == request.id).ToList();

                _context.Products.Remove(product);
                _context.ProductCategory.RemoveRange(productCategories);
                _context.ProductImage.RemoveRange(productImage);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Error during saving cahnges");
            }
        }
    }
}