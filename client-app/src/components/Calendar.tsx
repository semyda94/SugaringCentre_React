import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
// JavaScript library that creates a callendar with events
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import Select from "react-select";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Modal,
    Row,
    Col
} from "reactstrap";

//Stores
import StaffStore from './../app/strore/staffStore';
import ServiceStore from './../app/strore/serviceStores/serviceStore';
import BookingStore from './../app/strore/bookingStore';
import moment from "moment";

interface ICalendarForStaffPoprs {
    id: number;
}

let calendar: FullCalendar;

const BookingCalendar: React.FC<ICalendarForStaffPoprs> = ({ id }) => {

    const staffStore = useContext(StaffStore);
    const serviceStore = useContext(ServiceStore);
    const bookingStore = useContext(BookingStore);

    const { loadTimeOptionsForDate, timeOptions } = staffStore
    const { loadServiceOptions, serviceOptions } = serviceStore;
    const { bookingList, selectedBooking, loadBooking, createBooking, editBooking } = bookingStore;

    const [alert, setalert] = useState<any>(null);

    const [modalAdd, setmodalAdd] = useState(false);
    const [modalChange, setmodalChange] = useState(false);
    const [radios, setradios] = useState("bg-info");


    const [service, setService] = useState<{
        value: number;
        label: string;
    } | undefined>(undefined);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState({ value: "", state: "invalid" })
    const [firstname, setFirstName] = useState({ value: "", state: "invalid" })
    const [lastName, setLastName] = useState({ value: "", state: "invalid" })
    const [email, setEmail] = useState({ value: "", state: "invalid" })
    const [phone, setPhone] = useState({ value: "", state: "invalid" })


    const [events, setevents] = useState<{
        id: number;
        title: string;
        start: Date;
        allDay: boolean;
        className: string;
        description: string;
    }[]>([]);


    useEffect(() => {
        var newEventsList: {
            id: number;
            title: string;
            start: Date;
            allDay: boolean;
            className: string;
            description: string;
        }[] = [];

        bookingList.map((booking, idx) => {
            if (booking.staffId === id) {
                var startDate = new Date(booking.date);
                var time = moment(booking.time, "hh:mm a").toDate();

                startDate.setHours(time.getHours(), time.getMinutes());

                newEventsList.push({
                    id: booking.bookingId,
                    title: booking.firstName + ' ' + booking.lastName,
                    start: startDate,
                    allDay: false,
                    className: "bg-red",
                    description:
                        "TestDescription"
                })
            }
        })

        setevents(newEventsList);

    }, [bookingList])

    useEffect(() => {
        loadServiceOptions();

        if (selectedBooking !== undefined && selectedBooking.staffId === id) {
            loadTimeOptionsForDate(id, selectedBooking.serviceId, new Date(selectedBooking.date))

            setFirstName({ value: selectedBooking.firstName, state: selectedBooking.firstName === "" ? "invalid" : "valid" });
            setLastName({ value: selectedBooking.lastName, state: selectedBooking.lastName === "" ? "invalid" : "valid" });
            setEmail({ value: selectedBooking.email, state: selectedBooking.email === "" ? "invalid" : "valid" });
            setPhone({ value: selectedBooking.phone, state: selectedBooking.phone === "" ? "invalid" : "valid" });
            setDate(new Date(selectedBooking.date));


            serviceOptions.forEach(service => {
                if (service.value === selectedBooking.serviceId) {
                    setService(service);
                }
            });
        }
    }, [selectedBooking])

    const calendarRef = React.createRef<FullCalendar>();
    const calendarApi = calendarRef.current?.getApi();

    const loadEventForModification = (id: number) => {
        loadBooking(id);

        loadServiceOptions();
        setmodalAdd(true);
    }

    const submitModal = () => {
        if (selectedBooking === undefined) {
            addNewEvent();
        } else {
            changeEvent();
        }
    }

    const addNewEvent = () => {
        createBooking({
            bookingId: 0,
            serviceId: service?.value!,
            staffId: id,
            date: date,
            time: time.value,
            firstName: firstname.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value
        });

        cleanModal();
    };


    const changeEvent = () => {
        editBooking(
            {
                bookingId: selectedBooking?.bookingId!,
                serviceId: service?.value!,
                staffId: id,
                date: selectedBooking?.date!,
                time: time.value,
                firstName: firstname.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value
            }
        );

        cleanModal();
    };

    const cleanModal = () => {
        setFirstName({ value: "", state: "invalid" });
        setLastName({ value: "", state: "invalid" });
        setEmail({ value: "", state: "invalid" });
        setPhone({ value: "", state: "invalid" });
        setDate(new Date());

        setmodalAdd(false);
    }

    const handleSelectService = async (selection: any) => {
        loadTimeOptionsForDate(id, selection.value, date);
        setService(selection);
    }

    const handleSelectTime = (selection: any) => {
        setTime({ value: selection.label, state: "" });
    }

    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>, stateName: string) => {

        switch (stateName) {
            case "phone":
                setPhone({ value: e.target.value, state: e.target.value === "" ? "invalid" : "valid" });
                break;
            case "email":
                setEmail({ value: e.target.value, state: e.target.value === "" ? "invalid" : "valid" });
                break;
            case "firstname":
                setFirstName({ value: e.target.value, state: e.target.value === "" ? "invalid" : "valid" });
                break;
            case "lastname":
                setLastName({ value: e.target.value, state: e.target.value === "" ? "invalid" : "valid" });
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <>
                {alert}
                <Card className="card-calendar">
                    <CardBody className="m-2">
                        <FullCalendar
                            defaultView="dayGridMonth"
                            header={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            ref={calendarRef}
                            weekends={true}
                            events={events}
                            eventClick={e => {
                                loadEventForModification(Number(e.event.id));
                            }}
                            dateClick={e => {
                                loadServiceOptions();
                                setmodalAdd(true);
                                setDate(e.date);
                                setradios("bg-info");
                            }}
                        />
                    </CardBody>
                </Card>

                <Modal
                    isOpen={modalAdd}
                    toggle={() => setmodalAdd(false)}
                    className="modal-dialog-centered modal-secondary"
                >
                    <div className="modal-body">
                        <form className="new-event--form">
                            <h1 style={{ textAlign: "center" }}>{selectedBooking === undefined ? "New Booking" : "Update Booking"} on {date.toDateString()}</h1>
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-service"
                                >
                                    Select Service
                            </label>

                                <Select
                                    value={service}
                                    id="input-service"
                                    placeholder="Select Service"
                                    options={serviceOptions}
                                    onChange={e => handleSelectService(e)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-time"
                                >
                                    Select Time
                            </label>

                                <Select
                                    id="input-time"
                                    placeholder="Select time"
                                    options={timeOptions}
                                    onChange={e => handleSelectTime(e)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                >
                                    First Name*
                            </label>
                                <Input
                                    value={firstname.value}
                                    className="form-control-alternative"
                                    id="input-first-name"
                                    placeholder="First Name"
                                    type="text"
                                    onChange={e => handleInputChanged(e, "firstname")}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-last-name"
                                >
                                    Last Name*
                            </label>
                                <Input
                                    value={lastName.value}
                                    className="form-control-alternative"
                                    id="input-last-name"
                                    placeholder="Last Name"
                                    type="text"
                                    onChange={e => handleInputChanged(e, "lastname")}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-email"
                                >
                                    Email*
                            </label>
                                <Input
                                    value={email.value}
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder="Email"
                                    type="email"
                                    onChange={e => handleInputChanged(e, "email")}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-country"
                                >
                                    Phone*
                            </label>
                                <Input
                                    value={phone.value}
                                    className="form-control-alternative"
                                    id="input-phone"
                                    placeholder="Phone"
                                    type="tel"
                                    onChange={e => handleInputChanged(e, "phone")}
                                />
                            </FormGroup>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="new-event--add"
                            color="primary"
                            type="button"
                            onClick={submitModal}
                        >
                            {selectedBooking === undefined ? "Add Booking" : "Update Booking"}
                        </Button>
                        <Button
                            className="ml-auto"
                            color="link"
                            type="button"
                            onClick={() => cleanModal()}
                        >
                            Close
            </Button>
                    </div>
                </Modal>
            </>
        </div>
    )
}

export default observer(BookingCalendar)
