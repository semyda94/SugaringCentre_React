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
import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

//Core Components
import DashboardHeader from '../../../components/Headers/DashboardHeader'
import OrdersCountBarChart from '../../../components/Charts/OrdersCountBarChart'
import { IBarOptions } from "../../../app/models/charts/barChart";
import BookingCountBarChart from "../../../components/Charts/BookingCountBarChart";
import BookingPerMasterPieChart from "../../../components/Charts/BookingPerMasterPieChart";

const Index = () => {
    return (
        <div>
            <DashboardHeader />

            <Container className="mt--6" fluid>
                <Row>
                    <Col lg={4}>
                        <BookingCountBarChart />
                    </Col>

                    <Col lg={4}>
                        <BookingPerMasterPieChart />
                    </Col>
                    <Col lg={4}>
                        <OrdersCountBarChart />
                    </Col>
                </Row>

            </ Container>
        </div>
    )
}

export default Index;