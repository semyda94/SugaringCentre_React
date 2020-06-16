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

import React, { useRef, useEffect } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

// reactstrap components
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

import { Container, Row, Col } from "reactstrap";

import routes from "./../routers";

import MainNavbar from './../components/Navbar/MainNavbar';


const Authentication = () => {

    useEffect(() => {
        document.body.classList.add("bg-default");

        return function cleanup() {
            document.body.classList.remove("bg-default");
        }
    }, [])

    const ref = useRef("mainContent")

    return (
        <>
            <div className="main-content">
                <MainNavbar />

                {/* Page content */}
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Switch>
                            {routes.map((prop, key) => {
                                if (prop.layout === "/auth") {
                                    return (
                                    <Route exact
                                            path={prop.layout + prop.path}
                                            component={prop.component}
                                            key={key}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })};
                            
                            <Redirect from="*" to="/auth/login" />
                        </Switch>
                    </Row>
                </Container>
            </div>
            {/* <AuthFooter /> */}
        </>
    )
}

export default Authentication
