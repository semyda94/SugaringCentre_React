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
    const { loadForStaff, listForStaff, createBooking } = bookingStore;

    const [alert, setalert] = useState<any>(null);
    const [currentDate, setcurrentDate] = useState("");

    const [modalAdd, setmodalAdd] = useState(false);
    const [modalChange, setmodalChange] = useState(false);
    const [radios, setradios] = useState("bg-info");


    const [service, setService] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState({ value: "", state: "invalid" })
    const [firstname, setFirstName] = useState({ value: "", state: "invalid" })
    const [lastName, setLastName] = useState({ value: "", state: "invalid" })
    const [email, setEmail] = useState({ value: "", state: "invalid" })
    const [phone, setPhone] = useState({ value: "", state: "invalid" })


    const [event, setevent] = useState<any>();
    const [eventId, seteventId] = useState("");
    const [eventTitle, seteventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    const [events, setevents] = useState<{
        id: number;
        title: string;
        start: Date;
        allDay: boolean;
        className: string;
        description: string;
    }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const bookings = await loadForStaff(id);
        }

        fetchData();
    }, []);

    useEffect(() => {

        var newEventsList: {
            id: number;
            title: string;
            start: Date;
            allDay: boolean;
            className: string;
            description: string;
        }[] = [];
        
        listForStaff.map((booking, idx) => {
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
        })

        setevents(newEventsList);

    }, [listForStaff])

    const calendarRef = React.createRef<FullCalendar>();
    const calendarApi = calendarRef.current?.getApi();

    const addNewEvent = () => {
        createBooking({
            bookingId: 0,
            serviceId: service,
            staffId: id,
            date: date,
            time: time.value,
            firstName: firstname.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value
        });

        setmodalAdd(false);
    };


    const changeEvent = () => {
        // var newEvents = events.map((prop, key) => {
        //   if (prop.id + "" === eventId + "") {
        //     event.remove();
        //     calendarApi?.addEvent({
        //       ...prop,
        //       title: eventTitle,
        //       className: radios,
        //       description: eventDescription
        //     });
        //     return {
        //       ...prop,
        //       title: eventTitle,
        //       className: radios,
        //       description: eventDescription
        //     };
        //   } else {
        //     return prop;
        //   }
        // });
        // this.setState({
        //   modalChange: false,
        //   events: newEvents,
        //   radios: "bg-info",
        //   eventTitle: undefined,
        //   eventDescription: undefined,
        //   eventId: undefined,
        //   event: undefined
        // });
    };

    //   useEffect(() => {
    //       createCalendar()
    //   }, [createCalendar]);

    const handleSelectService = async (selection: any) => {
        loadTimeOptionsForDate(id, selection.value, date);
        setService(selection.value);
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
                                setmodalChange(true);
                                seteventId(e.event.id);
                                seteventTitle(e.event.title);
                                setEventDescription(e.event.extendedProps.description);
                                setradios("bg-info");
                                setevent(e.event);
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
                            <h1 style={{ textAlign: "center" }}>New Booking on {date.toDateString()}</h1>

                            <FormGroup className="mb-0">
                                <label className="form-control-label d-block mb-3">
                                    Status color
                </label>
                                <ButtonGroup
                                    className="btn-group-toggle btn-group-colors event-tag"
                                    data-toggle="buttons"
                                >
                                    <Button
                                        className={classnames("bg-info", {
                                            active: radios === "bg-info"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-info")}
                                    />
                                    <Button
                                        className={classnames("bg-warning", {
                                            active: radios === "bg-warning"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-warning")}
                                    />
                                    <Button
                                        className={classnames("bg-danger", {
                                            active: radios === "bg-danger"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-danger")}
                                    />
                                    <Button
                                        className={classnames("bg-success", {
                                            active: radios === "bg-success"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-success")
                                        }
                                    />
                                    <Button
                                        className={classnames("bg-default", {
                                            active: radios === "bg-default"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() =>
                                            setradios("bg-default")
                                        }
                                    />
                                    <Button
                                        className={classnames("bg-primary", {
                                            active: radios === "bg-primary"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => {
                                            setradios("bg-primary");
                                        }}
                                    />
                                </ButtonGroup>
                            </FormGroup>

                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-service"
                                >
                                    Select Service
                            </label>

                                <Select
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
                            onClick={addNewEvent}
                        >
                            Add Booking
            </Button>
                        <Button
                            className="ml-auto"
                            color="link"
                            type="button"
                            onClick={() => setmodalAdd(false)}
                        >
                            Close
            </Button>
                    </div>
                </Modal>
                <Modal
                    isOpen={modalChange}
                    toggle={() => setmodalChange(false)}
                    className="modal-dialog-centered modal-secondary"
                >
                    <div className="modal-body">
                        <Form className="edit-event--form">
                            <FormGroup>
                                <label className="form-control-label">Event title</label>
                                <Input
                                    className="form-control-alternative edit-event--title"
                                    placeholder="Event Title"
                                    type="text"
                                    defaultValue={eventTitle}
                                    onChange={e => seteventTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label className="form-control-label d-block mb-3">
                                    Status color
                </label>
                                <ButtonGroup
                                    className="btn-group-toggle btn-group-colors event-tag mb-0"
                                    data-toggle="buttons"
                                >
                                    <Button
                                        className={classnames("bg-info", {
                                            active: radios === "bg-info"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-info")}
                                    />
                                    <Button
                                        className={classnames("bg-warning", {
                                            active: radios === "bg-warning"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-warning")}
                                    />
                                    <Button
                                        className={classnames("bg-danger", {
                                            active: radios === "bg-danger"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => setradios("bg-danger")}
                                    />
                                    <Button
                                        className={classnames("bg-success", {
                                            active: radios === "bg-success"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() =>
                                            setradios("bg-success")
                                        }
                                    />
                                    <Button
                                        className={classnames("bg-default", {
                                            active: radios === "bg-default"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() =>
                                            setradios("bg-default")
                                        }
                                    />
                                    <Button
                                        className={classnames("bg-primary", {
                                            active: radios === "bg-primary"
                                        })}
                                        color=""
                                        type="button"
                                        onClick={() => {
                                            setradios("bg-primary");
                                        }}
                                    />
                                </ButtonGroup>
                            </FormGroup>
                            <FormGroup>
                                <label className="form-control-label">Description</label>
                                <Input
                                    className="form-control-alternative edit-event--description textarea-autosize"
                                    placeholder="Event Desctiption"
                                    type="textarea"
                                    defaultValue={eventDescription}
                                    onChange={e =>
                                        setEventDescription(e.target.value)
                                    }
                                />
                                <i className="form-group--bar" />
                            </FormGroup>
                            <input className="edit-event--id" type="hidden" />
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button color="primary" onClick={changeEvent}>
                            Update
            </Button>
                        <Button
                            color="danger"
                        // onClick={() => setmodalChange(false),
                        // () => deleteEventSweetAlert()
                        // }
                        >
                            Delete
            </Button>
                        <Button
                            className="ml-auto"
                            color="link"
                            onClick={() => setmodalChange(false)}
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
