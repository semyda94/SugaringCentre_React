using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Api.Persistence;

namespace Api.Application.Categories
{
    public class List
    {
        public class Query : IRequest<List<Domain.Category>> {}

        public class Handler : IRequestHandler<Query, List<Domain.Category>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _context.Categories.ToListAsync();

                return categories;
            }
        }
    }
}