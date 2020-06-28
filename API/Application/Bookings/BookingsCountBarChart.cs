using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Persistence;
using API.Application.Classes;
using MediatR;

namespace API.Application.Bookings
{
    public class BookingsCountBarChart
    {
        public class Query : IRequest<ChartData> {}

        public class Handler: IRequestHandler<Query, ChartData> {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<ChartData> Handle(Query request, CancellationToken cancellationToken)
            {
                var dateFrom = DateTime.Today.AddMonths(-6);
                dateFrom= dateFrom.AddDays(DateTime.Today.Day);

                var lables = new List<String>();
                var datasets = new List<Dataset>();

                var dataset = new Dataset{
                        Label = "Total Bookings",
                        Data = new List<int>{}
                    };

                for (int i = 0; i < 6; ++i) {
                    lables.Add(dateFrom.AddMonths(i).ToString("MMM"));

                    dataset.Data.Add(_context.Bookings.Count(b => b.Date.Year == dateFrom.AddMonths(i).Year && b.Date.Month == dateFrom.AddMonths(i).Month));
                }

                datasets.Add(dataset);

                var result = new ChartData{
                    Labels = lables,
                    Datasets = datasets
                };

                return result;
            }
        }
    }
}