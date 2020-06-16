using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products {
    public class Details {
        public class Query : IRequest<Product> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Product> {
            private readonly DataContext _context;

            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Products
                    .Include(x => x.ProductCategory)
                    .Include(x => x.ProductImages)                    
                    .FirstOrDefaultAsync(x => x.ProductId == request.Id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound);

                return product;
            }
        }
    }
}