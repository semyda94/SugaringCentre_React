using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Staffs
{
    public class List
    {
        public class Query : IRequest<List<Domain.Staff>> {}

        public class Handler : IRequestHandler<Query, List<Domain.Staff>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) {
                _context = context;
            }
            
            public async Task<List<Domain.Staff>> Handle(Query request, CancellationToken cancellationToken)
            {
                var staff = await _context.Staff.ToListAsync();

                return staff;
            }

        }
    }
}