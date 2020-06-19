using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;
using System.Linq;
using System.Collections.Generic;

namespace Api.Application.Products {
    public class Edit {
        public class Command : IRequest {
            public int ProductId { get; set; }
            public string Title { get; set; }
            public string Desc { get; set; }
            public string ShortDescription { get; set; }
            public decimal Price { get; set; }
            public string CategorySelected { get; set; }
            public List<Domain.ProductImage> ProductImages { get; set; }
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

                var categoriesInDb = _context.ProductCategory.Where(x => x.ProductId == request.ProductId).Select(x => x.CategoryId);
                var imagesInDb = _context.ProductImage.Where(x => x.ProductId == request.ProductId).Select(x => x.Image);

                var categiesToAdd = request.CategorySelected
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(c => Int32.Parse(c))
                    .Where(c => !categoriesInDb.Contains(c));

                var imagesToAdd = request.ProductImages
                    .Where(pi => !imagesInDb.Contains(pi.Image))
                    .Select(pi => pi.Image);

                foreach (var category in categiesToAdd)
                {
                    _context.ProductCategory.Add(new Domain.ProductCategory{
                        CategoryId = category,
                        ProductId = request.ProductId
                    });
                }

                foreach (var image in imagesToAdd)
                {
                    _context.ProductImage.Add(new Domain.ProductImage {
                        ProductId = request.ProductId,
                        Image = image
                    });
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem during saving");
            }
        }
    }
}