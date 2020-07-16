using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Staffs
{
    public class Top
    {
        public class Query : IRequest<List<Staff>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Staff>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Staff>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Staff.Include(s => s.StaffImage).Take(3).ToListAsync();
            }
        }

    }
}