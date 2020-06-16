import React from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap'

import './../../assets/css/mainFooter.css';

const MainFooter = () => {
    return (
        <div>
            <Container fluid className="footerContainer">
                <div className="paddingContainer">
                    <Row className="formContainer shadowContainer" >
                        <Col md={6}>
                            <div className="tiitle-box">
                                <h5 className="contact-title">Send Message Us</h5>
                            </div>
                            <div>
                                <Form>
                                    <FormGroup className="row">
                                        <Col md="12">
                                            <Input
                                                placeholder="Your Name"
                                                id="example-text-input"
                                                type="text"
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Col md="12">
                                            <Input
                                                placeholder="Email"
                                                id="example-email-input"
                                                type="email"
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Col md="12">
                                            <Input
                                                placeholder="Subject"
                                                id="example-text-input"
                                                type="text"
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            placeholder="Message"
                                            id=""
                                            rows="3"
                                            type="textarea"
                                        />
                                    </FormGroup>

                                    <div style={{textAlign: "center"}}>
                                        <Button className="getInTouchButtonsColor" size="lg" type="button">
                                            Send Message
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="tiitle-box">
                                <h5 className="contact-title">Get in Touch</h5>
                            </div>

                            <div>
                                <p className="additionalInfo">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at. Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis mollitia inventore?
                                </p>
                                <p className="additionalInfo">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem expedita aperiam aliquid at. Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis mollitia inventore?
                                </p>

                                <div className=" text-center">
                                    <div className="mt-3">
                                        <Button
                                            className="btn-icon-only rounded-circle getInTouchButtonsColor"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fa fa-instagram" />
                                        </Button>
                                        <Button
                                            className="btn-icon-only rounded-circle ml-1 getInTouchButtonsColor"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fa fa-facebook" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default MainFooter