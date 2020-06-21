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

// reactstrap components
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

// nodejs library that concatenates classes
import classnames from "classnames";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";

//interfaces
import { IFirstLayerRoute, ISecondLayerRoute } from './../../interfaces/IRouter'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'

//import History
import { history } from './../../'

interface IProps {
    routes: IFirstLayerRoute[];
    logo: any;
    sidenavOpen: boolean,
    // setSidenavOpen: Dispatch<SetStateAction<boolean>>
    toggleSidenav: (e: any) => void;
}

export const Sidebar: React.FC<IProps> = ({ routes, logo, sidenavOpen, toggleSidenav }) => {

    //TODO: Fix location retrive
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName: string) => {
        return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    // makes the sidenav normal on hover (actually when mouse enters on it)
    const onMouseEnterSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.add("g-sidenav-show");
        }
    };
    // makes the sidenav mini on hover (actually when mouse leaves from it)
    const onMouseLeaveSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-show");
        }
    };

    const getCollapseInitialState = (routes: ISecondLayerRoute[]) => {
        for (let i = 0; i < routes.length; i++) {
            //   if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
            //     return true;
            //   } else 
            if (window.location.href.indexOf(routes[i].path!) !== -1) {
                return true;
            }
        }
        return false;
    }

    // this creates the intial state of this component based on the collapse routes
    // that it gets through this.props.routes
    const getCollapseStates = (routes: IFirstLayerRoute[]): { [key: string]: boolean } => {
        let initialState = {};
        routes.map((prop, key) => {
            if (prop.collapse) {
                initialState = {
                    [prop.state!]: getCollapseInitialState(prop.views),
                    // ...this.getCollapseStates(prop.views),
                    ...initialState
                };
            }
            return null;
        });
        return initialState;
    };

    const [states, setStates] = useState(getCollapseStates(routes))

    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank"
        };
    }

    const scrollBarInner = (
        <div className="scrollbar-inner">
            <div className="sidenav-header d-flex align-items-center">
                {logo ? (
                    <NavbarBrand {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                <div className="ml-auto">
                    <div
                        className={classnames("sidenav-toggler d-none d-xl-block", {
                            active: sidenavOpen
                        })}
                        onClick={toggleSidenav}
                    >
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-inner">
                <Collapse navbar isOpen={true}>
                    <Nav navbar>
                        {routes.map((route, key) => {
                            if (route.layout === "/admin") {
                                if (route.collapse) {
                                    var st: any = {};
                                    st[route.state] = !states[route.state as any];
                                    return (
                                        <NavItem key={key}>
                                            <NavLink
                                                href="#pablo"
                                                data-toggle="collapse"
                                                aria-expanded={states[route.state]}
                                                className={classnames({
                                                    active: getCollapseInitialState(route.views)
                                                })}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setStates(st);
                                                }}
                                            >
                                                {route.icon ? (
                                                    <>
                                                        <i className={route.icon} />
                                                        <span className="nav-link-text">{route.name}</span>
                                                    </>
                                                ) : route.miniName ? (
                                                    <>
                                                        <span className="sidenav-mini-icon"> {route.miniName} </span>
                                                        <span className="sidenav-normal"> {route.name} </span>
                                                    </>
                                                ) : null}
                                            </NavLink>
                                            <Collapse isOpen={states[route.state]}>
                                                <Nav className="nav-sm flex-column">
                                                    {route.views.map((view, key) => {
                                                        return(
                                                        <NavItem
                                                            className={activeRoute(view.layout + view.path)}
                                                            key={key}
                                                        >
                                                            <NavLink
                                                                to={view.layout + view.path}
                                                                activeClassName=""
                                                                // onClick={this.closeSidenav}
                                                                tag={NavLinkRRD}
                                                            >
                                                                {view.miniName !== undefined ? (
                                                                    <>
                                                                        <span className="sidenav-mini-icon"> {view.miniName} </span>
                                                                        <span className="sidenav-normal"> {view.name} </span>
                                                                    </>
                                                                ) : (
                                                                            view.name
                                                                        )}
                                                            </NavLink>
                                                        </NavItem>
                                                        );
                                                    })}
                                                </Nav>
                                            </Collapse>
                                        </NavItem>
                                    );
                                }
                                return (
                                    <NavItem
                                        className={activeRoute(route.layout! + route.path!)}
                                        key={key}
                                    >
                                        <NavLink
                                            to={route.layout! + route.path!}
                                            activeClassName=""
                                            // onClick={this.closeSidenav}
                                            tag={NavLinkRRD}
                                        >
                                            {route.icon !== undefined ? (
                                                <>
                                                    <i className={route.icon} />
                                                    <span className="nav-link-text">{route.name}</span>
                                                </>
                                            ) : route.miniName !== undefined ? (
                                                <>
                                                    <span className="sidenav-mini-icon"> {route.miniName} </span>
                                                    <span className="sidenav-normal"> {route.name} </span>
                                                </>
                                            ) : (
                                                        route.name
                                                    )}
                                        </NavLink>
                                    </NavItem>
                                );
                            }
                        })}
                    </Nav>
                    <hr className="my-3" />
                    <h6 className="navbar-heading p-0 text-muted">
                        <span className="docs-normal">Other</span>
                        <span className="docs-mini">O</span>
                    </h6>
                    <Nav className="mb-md-3" navbar>
                        <NavItem>
                            <NavLink
                                to="/index"
                            >
                                <i className="ni ni-spaceship" />
                                <span className="nav-link-text">Back to site</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </div>
    );

    return (
        <Navbar
            className="sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left"
            onMouseEnter={onMouseEnterSidenav}
            onMouseLeave={onMouseLeaveSidenav}
        >
            {navigator.platform.indexOf("Win") > -1 ? (
                <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
            ) : (
                    scrollBarInner
                )}
        </Navbar>
    )
}



export default Sidebar;
