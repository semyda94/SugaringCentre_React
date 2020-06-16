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

import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import AdminNavbar from "./../components/Navbar/AdminNavbar";
import Sidebar from "./../components/Sidebar/Sidebar";
import Details from './../views/pages/adminConsole/Staff/Details'

import { ISecondLayerRoute } from './../interfaces/IRouter'

import routes from "./../routers";


const AdminConsole = () => {

    const [sidenavOpen, setSidenavOpen] = useState(false)

    const toggleSidenav = () => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }

        setSidenavOpen(!sidenavOpen);
    };

    const secondLayerRoutes: ISecondLayerRoute[] = [];

    useEffect(() => {
        toggleSidenav();
    }, [])

    return (
        <>
            <Sidebar
                routes={routes}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: require("./../assets/images/logo.jpg"),
                    imgAlt: "..."
                }}
            />

            <div
                className="main-content"
                // ref="mainContent"
                onClick={() => setSidenavOpen(false)}
            >
                <AdminNavbar
                    toggleSidenav={toggleSidenav}
                    sidenavOpen={sidenavOpen}
                />
                <Switch>

                    <Route
                        exact
                        path="/shop/staff/modify/:id"
                        component={Details}
                    />
                    {routes.map((route, key) => {
                        if (route.layout === "/admin") {
                            return (
                                <Route
                                    exact
                                    path={route.layout + route.path}
                                    component={route.component}
                                    key={key}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}

                    {
                        routes.forEach((route) => {
                            if (route.layout === "/admin" && route.collapse === true) {
                                route.views.forEach((view) => {
                                    secondLayerRoutes.push(view);
                                })
                            } else {
                                return null;
                            }
                        })}
                    {
                        secondLayerRoutes.map((view, key) => {
                            return (<Route
                                exact
                                path={view.layout + view.path}
                                component={view.component}
                                key={key}
                            />
                            );
                        })


                    }



                    <Redirect from="*" to="/admin/index" />
                </Switch>
                {/* <AdminFooter /> */}
            </div>
            {sidenavOpen ? (
                <div className="backdrop d-xl-none" onClick={toggleSidenav} />
            ) : null}
        </>
    )
}

export default AdminConsole;
