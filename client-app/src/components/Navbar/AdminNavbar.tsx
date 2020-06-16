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

import React from 'react'

// nodejs library that concatenates classes
import classnames from "classnames";

import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Navbar,
    NavItem,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap";

interface IProps {
    toggleSidenav: (e: any) => void ;
    sidenavOpen: boolean;
}

const AdminNavbar: React.FC<IProps> = ({toggleSidenav, sidenavOpen}) => {
    return (
        <div>
            <>
                <Navbar
                    className={classnames(
                        "navbar-top navbar-expand border-bottom", "navbar-dark bg-info"
                    )}
                >
                    <Container fluid>
                        <Collapse navbar isOpen={true}>

                            <Nav className="align-items-center ml-md-auto" navbar>
                                <NavItem className="d-xl-none">
                                    <div
                                        className={classnames(
                                            "pr-3 sidenav-toggler",
                                            { active: sidenavOpen }
                                        )}
                                        onClick={toggleSidenav}
                                    >
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line" />
                                            <i className="sidenav-toggler-line" />
                                            <i className="sidenav-toggler-line" />
                                        </div>
                                    </div>
                                </NavItem>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="nav-link" color="" tag="a">
                                        <i className="ni ni-ungroup" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                        className="dropdown-menu-lg dropdown-menu-dark bg-default"
                                        right
                                    >
                                        <Row className="shortcuts px-4">
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                                                <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                                                    <i className="ni ni-calendar-grid-58" />
                                                </span>
                                                <small>Calendar</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                                                <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                                                    <i className="ni ni-email-83" />
                                                </span>
                                                <small>Email</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                                                <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                                                    <i className="ni ni-credit-card" />
                                                </span>
                                                <small>Payments</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                                                <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                                                    <i className="ni ni-books" />
                                                </span>
                                                <small>Reports</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                                                <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                                                    <i className="ni ni-pin-3" />
                                                </span>
                                                <small>Maps</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                                                <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                                                    <i className="ni ni-basket" />
                                                </span>
                                                <small>Shop</small>
                                            </Col>
                                        </Row>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav className="align-items-center ml-auto ml-md-0" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                        <Media className="align-items-center">
                                            <span className="avatar avatar-sm rounded-circle">
                                                <img
                                                    alt="..."
                                                    src={require("./../../assets/images/team-4-800x800.jpg")}
                                                />
                                            </span>
                                            <Media className="ml-2 d-none d-lg-block">
                                                <span className="mb-0 text-sm font-weight-bold">
                                                    John Snow
                        </span>
                                            </Media>
                                        </Media>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem className="noti-title" header tag="div">
                                            <h6 className="text-overflow m-0">Welcome!</h6>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-single-02" />
                                            <span>My profile</span>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-settings-gear-65" />
                                            <span>Settings</span>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-calendar-grid-58" />
                                            <span>Activity</span>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-support-16" />
                                            <span>Support</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-user-run" />
                                            <span>Logout</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        </div>
    )
}

export default AdminNavbar
