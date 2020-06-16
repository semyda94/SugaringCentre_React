import React from 'react'

import routes from "./../routers";

import { Switch, Route, Redirect } from 'react-router-dom';

import Details from './../views/pages/shop/Details'

import BookingDetails from './../views/pages/booking/BookingDetails'
import BookingConfigrmation from './../views/pages/booking/BookingConfigrmation'

import MainNavbar from './../components/Navbar/MainNavbar';
import MainFooter from './../components/Footers/MainFooter';

const Main = () => {
    return (
        <>
            <div className="main-content">
                <MainNavbar />

                <Switch>

                    <Route
                        exact
                        path="/shop/details/:id"
                        component={Details}
                    />

                    <Route
                        exact
                        path="/bookings/details/:id"
                        component={BookingDetails}
                    />
                    <Route
                        exact
                        path="/bookings/bookservice/:id"
                        component={BookingConfigrmation}
                    />

                    {routes.map((prop, key) => {
                        if (prop.layout === "/") {
                            return (
                                <Route
                                    exact
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        } else {
                            return null;
                        }
                    })};

                            <Redirect from="*" to="/" />
                </Switch>

                <MainFooter />
            </div>
        </>
    )
}

export default Main
