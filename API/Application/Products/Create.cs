using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Api.Persistence;

namespace Api.Application.Products {

    public class Create {
        public class ImageForProduct {
            public int ProductImageId { get; set; }
            public int ProductId { get; set; }
            public string Image { get; set; }
        }

        public class Command : IRequest {
            public int ProductId { get; set; }
            public string Title { get; set; }
            public string Desc { get; set; }
            public string ShortDescription { get; set; }
            public decimal Price { get; set; }
            public string CategorySelected { get; set; }
            public List<ImageForProduct> productImages { get; set;}
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;

            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var newProduct = new Product {
                    Title = request.Title,
                    Price = request.Price,
                    Desc = request.Desc,
                    ShortDescription = request.ShortDescription
                };

                _context.Products.Add (newProduct);

                var success = await _context.SaveChangesAsync () > 0;

                foreach (var img in request.productImages)
                {
                    _context.ProductImage.Add(new Domain.ProductImage{
                        ProductId = newProduct.ProductId,
                        Image = img.Image
                    });
                }

                var categories = request.CategorySelected.Split(',', StringSplitOptions.RemoveEmptyEntries);

                foreach(var category in categories) {
                    _context.ProductCategory.Add( new ProductCategory{
                        ProductId = newProduct.ProductId,
                        CategoryId = Int16.Parse(category)
                    });
                }

                success = await _context.SaveChangesAsync () > 0;

                if (success)
                    return Unit.Value;

                throw new System.Exception ("Problem during saving");
            }
        }
    }
}