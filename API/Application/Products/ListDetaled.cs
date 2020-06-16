using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Api.Persistence;

namespace Api.Application.Products {
    public class ListDetaled {
        public class Query : IRequest<List<Product>> {
            public int PageSize { get; set; }
            public int Page { get; set; }
            public decimal MinPrice { get; set; }
            public decimal MaxPrice { get; set; }
            public string SelectedCategories { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Product>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<Product>> Handle (Query request, CancellationToken cancellationToken) {
                var categories = request.SelectedCategories.Split(',', StringSplitOptions.RemoveEmptyEntries);

                var products = await _context.Products
                    .Include(x => x.ProductCategory)
                    .ToListAsync();

                return products
                    .Where(x => 
                        (!categories.Any() || x.ProductCategory.Any(c => categories.Any(gc => gc.Contains(c.CategoryId.ToString())))) &&
                        request.MinPrice <= x.Price && 
                        (request.MaxPrice == 0 || x.Price <= request.MaxPrice) 
                        )
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize).ToList();
            }
        }
    }
}