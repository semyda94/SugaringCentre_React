import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Card, Row, Col, CardHeader, Collapse, CardBody, Button } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';

import ServiceStore from './../../../app/strore/serviceStores/serviceStore'
import { Link } from 'react-router-dom';

const BookingDetails = (props: any) => {
    const serviceStore = useContext(ServiceStore);
    const { loadServiceDetails, serviceDetails, openedCollapses } = serviceStore;

    useEffect(() => {
        loadServiceDetails(props.match.params.id);

        openedCollapses.push("collapseOne");
    }, [loadServiceDetails, props.match.params.id])

    // with this function we create an array with the opened collapses
    // it is like a toggle function for all collapses from this page
    const collapsesToggle = (collapse: string) => {
        if (openedCollapses.includes(collapse)) {
            const indexToDelete = openedCollapses.indexOf(collapse);

            if (indexToDelete > -1) {
                openedCollapses.splice(indexToDelete, 1);
            }
        } else {
            openedCollapses.push(collapse);
        }
    };

    return (
        <div>
            <div style={{
                minHeight: "375px",
                maxHeight: "540px",
                width: "100%"
            }}>
                <div className="shopHeader">
                </div>
            </div>

            <Container fluid className="container "
                style={{
                    marginTop: "-12.5rem"
                }}>

                <Card style={{ paddingTop: "70px", paddingBottom: "20px" }}>
                    <Row>
                        <Col md={6}>
                            <Container >
                                <Carousel showArrows={true}>
                                    <div>
                                        <img src={serviceDetails?.image} />
                                    </div>
                                    <div>
                                        {/* <img src={serviceDetails?.image} /> */}
                                    </div>
                                </Carousel>
                            </Container>
                        </Col>
                        <Col md={6}>
                            <h1 className="productDetailsTitle">{serviceDetails?.title}</h1>
                            <h3 className="productPrice">${serviceDetails?.price} | {serviceDetails?.duration} Min</h3>

                            <div className="accordion">
                                <Card className="card-plain mb-0" style={{ boxShadow: "none" }}>
                                    <CardHeader
                                        role="tab"
                                        onClick={() => collapsesToggle("collapseOne")}
                                        aria-expanded={openedCollapses.includes(
                                            "collapseOne"
                                        )}
                                        style={{ paddingLeft: "0px", paddingBottom: "10px" }}
                                    >
                                        <h5 className="mb-0 productCaroselTitle">Description</h5>
                                    </CardHeader>
                                    <Collapse
                                        role="tabpanel"
                                        isOpen={openedCollapses.includes("collapseOne")}
                                    >
                                        <CardBody>
                                            <div className="productDescription">

                                                <div dangerouslySetInnerHTML={{ __html: serviceDetails ? serviceDetails.desc : "" }} />
                                            </div>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                                {/* <Card className="card-plain mb-0" style={{ boxShadow: "none" }}>
                                    <CardHeader
                                        role="tab"
                                        onClick={() => collapsesToggle("collapseTwo")}
                                        aria-expanded={openedProductCollapses.includes(
                                            "collapseTwo"
                                        )}
                                        style={{ paddingLeft: "0px", paddingTop: "0px" }}
                                    >
                                        <h5 className="mb-0 productCaroselTitle">Specification</h5>
                                    </CardHeader>
                                    <Collapse
                                        role="tabpanel"
                                        isOpen={openedProductCollapses.includes("collapseTwo")}
                                    >
                                        <CardBody>
                                            <div className="productDescription">
                                                <div dangerouslySetInnerHTML={{ __html: productDetails ? productDetails.desc : "" }} />
                                            </div>
                                        </CardBody>
                                    </Collapse>
                                </Card> */}
                            </div>

                            <Row>
                                <Col md={6} style={{ textAlign: "right" }}>
                                    <Link to={`/bookings/bookservice/${serviceDetails?.serviceId}`}>
                                        <Button
                                            style={{
                                                backgroundColor: "rgba(255, 199, 40, 0.7)",
                                                borderColor: "rgba(255, 199, 40, 0.7)"
                                            }}
                                            type="submit">
                                            Book It
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

            </Container>
        </div >
    )
}

export default observer(BookingDetails);