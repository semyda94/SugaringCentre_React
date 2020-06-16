import React, { useState } from 'react';
import classnames from "classnames";

// components

import StaffTable from '../Tables/StaffTable'

// reactstrap components
import {
    Card,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container
  } from "reactstrap";

const StaffTabs = () => {

    const [activeTab, setActiveTab] = useState(1);

    const handleToogleTabs = (e: React.MouseEvent, index:number) => {
        e.preventDefault();

        setActiveTab(index);
    }

    return (
        <Container fluid>
            <div className="nav-wrapper">
                <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                >
                    <NavItem>
                        <NavLink
                            aria-selected={activeTab === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                                active: activeTab === 1
                            })}
                            onClick={e => handleToogleTabs(e, 1)}
                            href="#pablo"
                            role="tab"
                        >
                            <i className="ni ni-cloud-upload-96 mr-2" />
                Staff List
              </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            aria-selected={activeTab === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                                active: activeTab === 2
                            })}
                            onClick={e => handleToogleTabs(e, 2)}
                            href="#pablo"
                            role="tab"
                        >
                            <i className="ni ni-bell-55 mr-2" />
                New Staff
              </NavLink>
                    </NavItem>
                </Nav>
            </div>
            <Card className="shadow">
                <CardBody>
                    <TabContent activeTab={"tabs" + activeTab}>
                        <TabPane tabId="tabs1">
                            {/* <StaffTable /> */}
                        </TabPane>
                        
                        <TabPane tabId="tabs2">
                            <p className="description">
                                Cosby sweater eu banh mi, qui irure terry richardson ex
                                squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                                quis cardigan american apparel, butcher voluptate nisi qui.
                </p>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </Container>
    )
}

export default StaffTabs;