using System.Collections.Generic;
using API.Application.Classes;

namespace API.Application.Classes
{
    public class Dataset {
        public string Label { get; set; }
        public List<int> Data { get; set; }
        public int MaxBarThickness { get; set; } = 10;
        public string backgroundColor { get; set; } = "#f5365c";
    }

    public class ChartData
    {
        public List<string> Labels { get; set; }
        public List<Dataset> Datasets { get; set; }
    }
}