using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Api.Persistence;
using API.Application.Classes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Bookings
{
    public class BookingsCountPerMasterPieChart
    {
        public class Query : IRequest<ChartData> { }

        public class Handler : IRequestHandler<Query, ChartData>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async System.Threading.Tasks.Task<ChartData> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Bookings.Select(b => new {b.BookingId, b.StaffId}).ToListAsync();
                var ordersGroup = orders.GroupBy(b => b.StaffId);

                var lables = new List<String>();
                var datasets = new List<Dataset>();

                var result = new ChartData
                {
                    Labels = lables,
                    Datasets = datasets
                };

                foreach(var group in ordersGroup) {
                    var staff = _context.Staff.Where(x=> x.StaffId == group.Key).FirstOrDefault();

                    lables.Add(staff.FirstName + ' ' + staff.LastName);

                    datasets.Add(new Dataset {
                        Label = staff.FirstName + ' ' + staff.LastName,
                        Data = new List<int>{group.Count()}
                    });
                }

                return result;
            }
        }
    }
}