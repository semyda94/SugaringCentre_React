using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using Api.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Api.Persistence;

namespace Api.Application.Products {
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

                var productCategories = await _context.ProductCategory
                .Where(pc => pc.ProductId == request.Id)
                .Select(pc => pc.CategoryId.ToString()).ToListAsync();

                product.CategorySelected = string.Join(',', productCategories);

                return product;
            }
        }
    }
}