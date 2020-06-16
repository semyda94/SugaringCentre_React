using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;

namespace Api.Application.ProductImage {
    public class Details {
        public class Query : IRequest<Domain.ProductImage> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.ProductImage> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Domain.ProductImage> Handle (Query request, CancellationToken cancellationToken) {
                var image = _context.ProductImage.FirstOrDefault(x => x.ProductId == request.Id);

                if (image == null)
                    throw new RestException(HttpStatusCode.NotFound);

                return image;
            }
        }
    }
}