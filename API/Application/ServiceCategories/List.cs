using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Api.Persistence;

namespace Api.Application.ServiceCategories {
    public class List {
        public class Query : IRequest<List<ServiceCategory>> { }

        public class Handler : IRequestHandler<Query, List<ServiceCategory>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<ServiceCategory>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.ServiceCategory.ToListAsync();
            }
        }
    }
}