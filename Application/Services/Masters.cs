using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services {
    public class Masters {
        public class Query : IRequest<List<Domain.Staff>> {
            public int serviceId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Domain.Staff>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<Staff>> Handle (Query request, CancellationToken cancellationToken) {
                var staffIds = await _context.ServiceStaff.Where(s => s.ServiceId == request.serviceId).Select(s => s.StaffId).ToListAsync();

                return await _context.Staff.Where(s => staffIds.Contains(s.StaffId)).ToListAsync();
            }
        }
    }
}