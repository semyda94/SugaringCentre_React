/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, CardImg, Button } from 'reactstrap'
import "./../../assets/style.css"
import { Link } from 'react-router-dom'

import StaffStore from '../../app/strore/staffStore';
import { observer } from 'mobx-react-lite';

const Main = () => {

    const staffStore = useContext(StaffStore)
    const { staffForMain, loadStaffForMain } = staffStore

    useEffect(() => {
        loadStaffForMain();
    }, [])

    return (
        <>
            <section className="section pb-0 bg-gradient-warning">
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col className="order-lg-2 ml-lg-auto" md="6">
                            <div className="position-relative pl-md-5">
                                <img
                                    id="mainLogo"
                                    alt="..."
                                    className="img-center img-fluid"
                                    src={require("./../../assets/images/logo-nbg.png")}
                                />
                            </div>
                        </Col>
                        <Col className="order-lg-1" md="6">
                            <div className="d-flex px-3">
                                <div className="pl-4">
                                    <h6 className="display-4 text-white" style={{ textAlign: "center" }}>Your #1 Natural Hair Removal Centre in New Zealand</h6>
                                    <p className="text-white" style={{ textAlign: "center" }}>SAFE ORGANIC GENTLE ECO AND VEGAN FRIENDLY</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew zindex-100" style={{ position: "inherit" }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="fill-white"
                            points="2560 10 2560 100 0 100"
                        />
                    </svg>
                </div>
            </section>


            <section className="section" style={{ backgroundColor: "white" }}>
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col md="6">
                            <Card className="bg-default shadow border-0">
                                <CardImg
                                    alt="..."
                                    src={require("./../../assets/images/image1.jpg")}
                                    top
                                />
                                <blockquote className="card-blockquote">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="svg-bg"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 583 95"
                                    >
                                        <polygon
                                            className="fill-default"
                                            points="0,52 583,95 0,95"
                                        />
                                        <polygon
                                            className="fill-default"
                                            opacity=".2"
                                            points="0,42 583,95 683,0 0,95"
                                        />
                                    </svg>
                                    <h4 className="display-3 font-weight-bold text-white">
                                        WHAT IS SUGARING?
                      </h4>
                                    <p className="lead text-italic text-white">
                                        The Arctic Ocean freezes every winter and much of the
                                        sea-ice then thaws every summer, and that process will
                                        continue whatever happens.
                      </p>
                                </blockquote>
                            </Card>
                        </Col>
                        <Col md="6">
                            <div className="pl-md-5">
                                <h1>Why is it better?</h1>
                                <p className="lead">
                                    Don't let your uses guess by attaching tooltips and
                                    popoves to any element. Just make sure you enable them
                                    first via JavaScript.
                    </p>
                                <p>
                                    The kit comes with three pre-built pages to help you get
                                    started faster. You can change the text and images and
                                    you're good to go.
                    </p>
                                <p>
                                    The kit comes with three pre-built pages to help you get
                                    started faster. You can change the text and images and
                                    you're good to go.
                    </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-6">
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col className="order-md-2" md="6">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={require("./../../assets/images/image2.jpg")}
                            />
                        </Col>
                        <Col className="order-md-1" md="6">
                            <div className="pr-md-5">
                                <h1>Only best products</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at.
                    </p>
                                <ul className="list-unstyled mt-5">
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <Badge
                                                    className="badge-circle mr-3"
                                                    color="success"
                                                >
                                                    <i className="ni ni-atom" />
                                                </Badge>
                                            </div>
                                            <div>
                                                <h4 className="mb-0">
                                                    Carefully crafted
                            </h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <Badge
                                                    className="badge-circle mr-3"
                                                    color="success"
                                                >
                                                    <i className="ni ni-sound-wave" />
                                                </Badge>
                                            </div>
                                            <div>
                                                <h4 className="mb-0">Halthy for you</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <Badge
                                                    className="badge-circle mr-3"
                                                    color="success"
                                                >
                                                    <i className="ni ni-favourite-28" />
                                                </Badge>
                                            </div>
                                            <div>
                                                <h4 className="mb-0">
                                                    Loved by everyone
                            </h4>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="py-6">
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col md="6">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={require("./../../assets/images/image2.jpg")}
                            />
                        </Col>
                        <Col md="6">
                            <div className="pr-md-5">
                                <h1>Our Shop</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at.
                    </p>
                                <Link
                                    className="font-weight-bold text-warning mt-5"
                                    to="/shop"
                                >
                                    Go to Shoping
                    </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className="section section-lg">
                <Container>
                    <Row className="justify-content-center text-center mb-lg">
                        <Col lg="8">
                            <h2 className="display-3">The amazing Team</h2>
                            <p className="lead text-muted">
                                According to the National Oceanic and Atmosphericf
                                Administration, Ted, Scambos, NSIDClead scentist, puts the
                                potentially record maximum.
                  </p>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: "center" }}>
                        {staffForMain.map((staff, idx) => {
                            return (
                                <Col className="mb-5 mb-lg-0" lg={12/staffForMain.length} md="6" key={idx}>
                                    <div className="px-4">
                                        <img
                                            alt="..."
                                            className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                            src={staff.staffImage[0].image}
                                            style={{ width: "200px" }}
                                        />
                                        <div className="pt-4 text-center">
                                            <h5 className="title">
                                                <span className="d-block mb-1">{staff.firstName} {staff.lastName}</span>
                                                <small className="h6 text-muted">{staff.title}</small>
                                            </h5>
                                            <div className="mt-3">
                                                <Button
                                                    className="btn-icon-only rounded-circle"
                                                    color="warning"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fab fa-instagram"></i>
                                                </Button>
                                                <Button
                                                    className="btn-icon-only rounded-circle ml-1"
                                                    color="warning"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fab fa-facebook-f"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}

                    </Row>
                </Container>
            </section>

            <section className="section section-lg pt-0" style={{ marginTop: "1rem" }} >
                <Container>
                    <Card className="bg-gradient-warning shadow-lg border-0">
                        <div className="p-5">
                            <Row className="align-items-center">
                                <Col lg="8">
                                    <h1 className="text-white">
                                        We make your life easier.
                                    </h1>
                                    <p className="lead text-white mt-3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at.
                                    </p>
                                </Col>
                                <Col className="ml-lg-auto" lg="3">
                                    <Link to="/bookings">
                                        <Button
                                            block
                                            className="btn-white"
                                            color="default"
                                            size="lg"
                                        >
                                            Check our services
                                    </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Container>
            </section>
        </>
    )
}

export default observer(Main)