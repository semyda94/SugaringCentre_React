using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Bookings
{
    public class List
    {
        public class Query : IRequest<List<Booking>> { }

        public class Handler : IRequestHandler<Query, List<Booking>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Booking>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Bookings.ToListAsync();
            }
        }
    }
}