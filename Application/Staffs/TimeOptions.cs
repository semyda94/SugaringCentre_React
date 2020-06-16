using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Classes;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Staffs {
    public class TimeOptions {
        public class Query : IRequest<List<TimeOption>> {
            public int StaffId { get; set; }
            public int ServiceId { get; set; }
            public DateTime Date { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<TimeOption>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<TimeOption>> Handle(Query request, CancellationToken cancellationToken)
            {
                var staff = await _context.Staff.FindAsync(request.StaffId);
                var service = await _context.Services.FindAsync(request.ServiceId);

                if (staff == null || service == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var timeOptions = new List<TimeOption>();

                var timeFrom = request.Date.AddHours(staff.WorkingFrom.Value.Hour).AddMinutes(staff.WorkingFrom.Value.Minute);
                var timeTo = request.Date.AddHours(staff.WorkingTo.Value.Hour).AddMinutes(staff.WorkingTo.Value.Minute);

                if (timeFrom > timeTo)
                    timeTo = timeTo.AddDays(1);

                for (DateTime i = timeFrom; i < timeTo; i = i.AddMinutes(service.Duration))
                {
                    timeOptions.Add(new TimeOption{
                        Value=i,
                        Label=i.ToShortTimeString()
                    });
                }

                return timeOptions;
            }
        }
    }
}