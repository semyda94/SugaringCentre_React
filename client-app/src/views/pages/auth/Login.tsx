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

import React, { useState } from 'react'

// nodejs library that concatenates classes
import classnames from "classnames"
import AuthHeader from './../../../components/Headers/AuthHeader'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container
} from "reactstrap";

const Login = () => {

    const [focusedEmail, setFocusedEmail] = useState(false)
    const [focusedPassword, setFocusedPassword] = useState(false)

    return (
        <>
            <AuthHeader
                title="Welcome!"
                lead="Use these awesome forms to login or create new account in your project for free."
            />
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Sign in with credentials</small>
                                </div>
                                <Form role="form">
                                    <FormGroup
                                        className={classnames("mb-3", {
                                            focused: focusedEmail
                                        })}
                                    >
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                onFocus={() => setFocusedEmail(true)}
                                                onBlur={() => setFocusedEmail(false)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup
                                        className={classnames({
                                            focused: focusedPassword
                                        })}
                                    >
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                onFocus={() =>
                                                    setFocusedPassword(true)
                                                }
                                                onBlur={() =>
                                                    setFocusedPassword(true)
                                                }
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin"
                                        >
                                            <span className="text-muted">Remember me</span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <Button className="my-4" color="info" type="button">
                                            Sign in
                      </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </Col>
                            <Col className="text-right" xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <small>Create new account</small>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login
