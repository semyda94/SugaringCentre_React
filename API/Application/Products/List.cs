using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Api.Persistence;

namespace Api.Application.Products
{
    public class List
    {
        public class Query : IRequest<List<Product>> { }

        public class Handler : IRequestHandler<Query, List<Product>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<List<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await _context.Products.ToListAsync();

                return products;
            }
        }
    }
}