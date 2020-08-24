import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from "react";
import classnames from "classnames";
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

import StaffStore from './../../../../app/strore/staffStore';
import BookingStore from './../../../../app/strore/bookingStore';

import BookingCalendar from './../../../../components/Calendar';

const Booking = () => {

    const staffStore = useContext(StaffStore);
    const bookingStore = useContext(BookingStore);

    const { loadStaff, staffList, bookingSelectedStaff, setBookingSelectedStaff } = staffStore;
    const { loadBookings } = bookingStore;

    const [tab, setTab] = useState(1)

    const toggleNavs = (index: number) => {
        setBookingSelectedStaff(index);
    };

    useEffect(() => {
        loadStaff();
        loadBookings();
    }, [loadStaff, loadBookings])

    return (
        <>
            <Container fluid>
                <Card>
                    <div className="nav-wrapper">
                        <Nav
                            className="nav-fill flex-column flex-md-row"
                            id="tabs-icons-text"
                            pills
                            role="tablist"
                        >
                            {staffList.map((staff, idx) => {
                                return (
                                    <NavItem key={idx}>
                                        <NavLink
                                            aria-selected={tab === staff.staffId}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: tab === 1
                                            })}
                                            onClick={e => toggleNavs(staff.staffId)}
                                            role="tab"
                                        >
                                            {staff.firstName} {staff.lastName}
                                        </NavLink>
                                    </NavItem>
                                );
                            })}
                        </Nav>
                    </div>
                    <Card className="shadow">
                        <CardBody>
                            <TabContent activeTab={"tabs" + bookingSelectedStaff}>
                                {staffList.map((staff, idx) => {
                                    return (
                                        <TabPane key={idx} tabId={"tabs" + staff.staffId}>
                                            <BookingCalendar id={staff.staffId} name={staff.firstName + ' ' + staff.lastName}/>
                                        </TabPane>
                                    );
                                })}

                            </TabContent>
                        </CardBody>
                    </Card>
                </Card>
            </Container>
        </>
    )
}

export default observer(Booking);