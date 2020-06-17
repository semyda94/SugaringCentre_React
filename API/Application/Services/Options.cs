using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Persistence;
using API.Application.Classes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Services {
    public class Options {
        public class Query : IRequest<List<SelectOptions>> { }

        public class Handler : IRequestHandler<Query, List<SelectOptions>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<SelectOptions>> Handle (Query request, CancellationToken cancellationToken) {
                return await _context.Services
                .Select(s => new SelectOptions{ value = s.ServiceId, label = s.Title})
                .ToListAsync();
            }
        }
    }
}