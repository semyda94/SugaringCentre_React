using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;

namespace Api.Application.Staffs {
    public class WorkingDays {
        public class Query : IRequest<List<int>> {
            public int StaffId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<int>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                var staff = await _context.Staff.FindAsync(request.StaffId);

                if (staff == null)
                    throw new RestException(HttpStatusCode.NotFound);

                return staff.WorkingDaysOfWeek.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(x => Int32.Parse(x)).ToList();
            }
        }
    }
}