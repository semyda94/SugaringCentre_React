import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap'

import './../../assets/css/mainFooter.css';
import "./../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";


const MainFooter = () => {

    const [name, setName] = useState({ value: "", state: "invalid" });
    const [email, setEmail] = useState({ value: "", state: "invalid" });
    const [subject, setSubject] = useState({ value: "", state: "invalid" });
    const [message, setMessage] = useState({ value: "", state: "invalid" });

    const InputChange = (name: string, newValue: string) => {
        const newState = newValue === "" ? "invalid" : "valid";

        switch (name) {
            case "name":
                setName({ value: newValue, state: newState });
                break;
            case "email":
                setEmail({ value: newValue, state: newState });
                break;
            case "subject":
                setSubject({ value: newValue, state: newState });
                break;
            case "message":
                setMessage({ value: newValue, state: newState });
                break;
            default:
                break;
        }
    };

    const SubmitMessage = () => {
        SendSMTP();

        ClearStates();
    }

    const SendSMTP = () => {

    }

    const ClearStates = () => {
        setName({ value: "", state: "invalid" });
        setEmail({ value: "", state: "invalid" });
        setSubject({ value: "", state: "invalid" });
        setMessage({ value: "", state: "invalid" });
    }

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
                                                value={name.value}
                                                placeholder="Your Name"
                                                id="example-text-input"
                                                type="text"
                                                onChange={e => InputChange("name", e.target.value)}
                                                valid={name.state === "valid"}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Col md="12">
                                            <Input
                                                value={email.value}
                                                placeholder="Email"
                                                id="example-email-input"
                                                type="email"
                                                onChange={e => InputChange("email", e.target.value)}
                                                valid={email.state === "valid"}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Col md="12">
                                            <Input
                                                value={subject.value}
                                                placeholder="Subject"
                                                id="example-text-input"
                                                type="text"
                                                onChange={e => InputChange("subject", e.target.value)}
                                                valid={subject.state === "valid"}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            value={message.value}
                                            placeholder="Message"
                                            id=""
                                            rows="3"
                                            type="textarea"
                                            onChange={e => InputChange("message", e.target.value)}
                                            valid={message.state === "valid"}
                                        />
                                    </FormGroup>

                                    <div style={{ textAlign: "center" }}>
                                        <Button
                                            className="getInTouchButtonsColor"
                                            size="lg"
                                            type="button"
                                            onClick={SubmitMessage}
                                            hidden=
                                            {
                                                name.state === "invalid" ||
                                                email.state === "invalid" ||
                                                subject.state === "invalid" ||
                                                message.state === "invalid"
                                            }>
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
                                            <i className="fab fa-instagram"></i>
                                        </Button>
                                        <Button
                                            className="btn-icon-only rounded-circle ml-1 getInTouchButtonsColor"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fab fa-facebook-f"></i>
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