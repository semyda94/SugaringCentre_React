/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useState, useEffect } from 'react'

import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
} from "reactstrap";

//Store

import DashboardStore from "./../../app/strore/dashboardStore";
import { observer } from 'mobx-react-lite';
import { IBarOptions } from '../../app/models/charts/barChart';

const BookingCountBarChart = () => { 
    const dashboardStore = useContext(DashboardStore);
    const { bookingsCountBarChartData, loadBookingsCountBars } = dashboardStore;

    const options = {
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: "#e9ecef",
                        zeroLineColor: "#e9ecef"
                    },
                    ticks: {
                        callback: function (value: any) {
                            if (!(value % 10)) {
                                //return '$' + value + 'k'
                                return value;
                            }
                        }
                    }
                }
            ]
        },
        tooltips: {
            callbacks: {
                label: function (item: any, data: any) {
                    var label = data.datasets[item.datasetIndex].label || "";
                    var yLabel = item.yLabel;
                    var content = "";
                    if (data.datasets.length > 1) {
                        content += label;
                    }
                    content += yLabel;
                    return content;
                }
            },
        }
    }

    const [data, setData] = useState<IBarOptions>({
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sample",
                data: [0, 0, 0, 0, 0, 0],
                maxBarThickness: 10,
                backgroundColor: "#f5365c"
            }
        ]
    })

    useEffect(() => {
        loadBookingsCountBars();
    }, []);

    useEffect(() => {
        if (bookingsCountBarChartData !== undefined) {

            if (bookingsCountBarChartData !== undefined) {
                setData({
                    labels: bookingsCountBarChartData.labels,
                    datasets: [ {
                        label: bookingsCountBarChartData.datasets[0].label,
                        data: bookingsCountBarChartData.datasets[0].data,
                        maxBarThickness: 10,
                        backgroundColor: "#f5365c"
                    }
                    ]
                });
            }
        }

    }, [bookingsCountBarChartData]);

    return (
        <>
            <Card>
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                                Overview
                      </h6>
                            <h5 className="h3 mb-0">Total Bookings</h5>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart">
                        <Bar
                            data={data}
                            options={options}
                        //   className="chart-canvas"
                        //   id="chart-bars"
                        />

                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default observer(BookingCountBarChart);
