using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Application.Classes;
using Api.Application.Errors;
using MediatR;
using Api.Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Api.Application.Staffs
{
    public class TimeOptions
    {
        public class Query : IRequest<List<TimeOption>>
        {
            public int StaffId { get; set; }
            public int ServiceId { get; set; }
            public DateTime Date { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<TimeOption>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TimeOption>> Handle(Query request, CancellationToken cancellationToken)
            {
                var staff = await _context.Staff.FindAsync(request.StaffId);
                var service = await _context.Services.FindAsync(request.ServiceId);

                if (staff == null || service == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var bookings = await _context.Bookings.Where(b => b.StaffId == request.StaffId && b.Date >= request.Date && b.Date <= request.Date.AddDays(1)).Include(b => b.ServiceNavigation).ToListAsync();

                var timeOptions = new List<TimeOption>();

                var timeFrom = request.Date.AddHours(staff.WorkingFrom.Value.Hour).AddMinutes(staff.WorkingFrom.Value.Minute);
                var timeTo = request.Date.AddHours(staff.WorkingTo.Value.Hour).AddMinutes(staff.WorkingTo.Value.Minute);

                if (timeFrom > timeTo)
                    timeTo = timeTo.AddDays(1);

                for (DateTime i = timeFrom; i.AddMinutes(service.Duration) < timeTo; i = i.AddMinutes(30))
                {
                    var include = true;
                    var endTime = i.AddMinutes(service.Duration);
                    
                    foreach (var booking in bookings)
                    {
                        var bookingEnd = booking.Date.AddMinutes(booking.ServiceNavigation.Duration);
                        
                        if ( (i >= booking.Date && i < bookingEnd) || (endTime > booking.Date && endTime < bookingEnd)) {
                            include = false;
                            break;
                        }

                    }

                    if (include)
                    {
                        timeOptions.Add(new TimeOption
                        {
                            Value = i,
                            Label = i.ToShortTimeString()
                        });
                    }
                }

                return timeOptions;
            }
        }
    }
}