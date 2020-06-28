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

// react plugin used to create charts
import { Pie } from "react-chartjs-2";
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

const BookingPerMasterPieChart = () => {
    const dashboardStore = useContext(DashboardStore);
    const { bookingsCountPerMasterPieChartData, loadBookingsCountPerMaster } = dashboardStore;

    const options = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }

    const colors: string[] = ["#172b4d",
    "#5e72e4",
    "#11cdef",
    "#2dce89",
    "#f5365c",
    "#fb6340",
    "#f4f5f7",]

    const [data, setData] = useState<any>({
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
        loadBookingsCountPerMaster();
    }, []);

    useEffect(() => {
        if (bookingsCountPerMasterPieChartData !== undefined) {

            if (bookingsCountPerMasterPieChartData !== undefined) {
                
                var data: any[] = [];
                for (let index = 0; index < bookingsCountPerMasterPieChartData.datasets.length; index++) {
                    data.push(bookingsCountPerMasterPieChartData.datasets[index].data)
                }

                setData({
                    labels: bookingsCountPerMasterPieChartData.labels,
                    datasets: [{
                        label: 'Test',
                        backgroundColor: colors,
                        data: data
                    }]
                });
            }
        }

    }, [bookingsCountPerMasterPieChartData]);

    return (
        <>
            <Card>
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                                Overview
                      </h6>
                            <h5 className="h3 mb-0">Bookings Per Master</h5>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart">
                        <Pie
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

export default observer(BookingPerMasterPieChart);
