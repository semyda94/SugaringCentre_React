import React, { useState, useContext } from "react";
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

interface ICalendarForStaffPoprs {
    id: number;
}

let calendar: FullCalendar;

const BookingCalendar: React.FC<ICalendarForStaffPoprs> = ({ id }) => {

    const staffStore = useContext(StaffStore);
    const serviceStore = useContext(ServiceStore);
    
    const {loadTimeOptionsForDate, timeOptions} = staffStore
    const { loadServiceOptions, serviceOptions } = serviceStore;

    const [alert, setalert] = useState<any>(null);
    const [currentDate, setcurrentDate] = useState("");

    const [modalAdd, setmodalAdd] = useState(false);
    const [modalChange, setmodalChange] = useState(false);
    const [radios, setradios] = useState("bg-info");


    const [service, setService] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState({value: "", state: "invalid"})
    const [firstname, setFirstName] = useState({value: "", state: "invalid"})
    const [lastName, setLastName] = useState({value: "", state: "invalid"})
    const [email, setEmail] = useState({value: "", state: "invalid"})
    const [phone, setPhone] = useState({value: "", state: "invalid"})


    const [event, setevent] = useState<any>();
    const [eventId, seteventId] = useState("");
    const [eventTitle, seteventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    // const changeView = (newView: any) => {
    //     calendar.changeView(newView);
    //     setcurrentDate(calendar.view.title);
    //   };

    const calendarRef = React.createRef<FullCalendar>();
    const calendarApi = calendarRef.current?.getApi();


    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();

    const [events, setevents] = useState([
        {
            id: 1,
            title: "Call with Dave",
            start: new Date(y, m, 1),
            allDay: false,
            className: "bg-red",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 2,
            title: "Lunch meeting",
            start: new Date(y, m, d - 1, 10, 30),
            allDay: true,
            className: "bg-orange",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 3,
            title: "All day conference",
            start: new Date(y, m, d + 7, 12, 0),
            allDay: true,
            className: "bg-green",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 4,
            title: "Meeting with Mary",
            start: new Date(y, m, d - 2),
            allDay: true,
            className: "bg-blue",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 5,
            title: "Winter Hackaton",
            start: new Date(y, m, d + 1, 19, 0),
            allDay: true,
            className: "bg-red",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 6,
            title: "Digital event",
            start: new Date(y, m, 21),
            allDay: true,
            className: "bg-warning",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 7,
            title: "Marketing event",
            start: new Date(y, m, 21),
            allDay: true,
            className: "bg-purple",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 8,
            title: "Dinner with Family",
            start: new Date(y, m, 19),
            allDay: true,
            className: "bg-red",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 9,
            title: "Black Friday",
            start: new Date(y, m, 23),
            allDay: true,
            className: "bg-blue",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },

        {
            id: 10,
            title: "Cyber Week",
            start: new Date(y, m, 2),
            allDay: true,
            className: "bg-yellow",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        }
    ]);

    const addNewEvent = () => {
        const newEvents = events;
        // calendarApi?.addEvent({
        //     title: firstname.value + ' ' + lastName.value,
        //     start: date,
        //     allDay: true,
        //     classnames: radios,
        //     id: events[events.length - 1].id + 1
        // })

        setmodalAdd(false);
        newEvents.push({
            title: firstname.value + ' ' + lastName.value,
            start: date,
            allDay: false,
            className: radios,
            description: "",
            id: events[events.length - 1].id + 1
        })


        setevents(newEvents);
        // var newEvents = this.state.events;
        // newEvents.push({
        //   title: this.state.eventTitle,
        //   start: this.state.startDate,
        //   end: this.state.endDate,
        //   className: this.state.radios,
        //   id: this.state.events[this.state.events.length - 1] + 1
        // });
        // calendar.addEvent({
        //   title: this.state.eventTitle,
        //   start: this.state.startDate,
        //   end: this.state.endDate,
        //   className: this.state.radios,
        //   id: this.state.events[this.state.events.length - 1] + 1
        // });
        // this.setState({
        //   modalAdd: false,
        //   events: newEvents,
        //   startDate: undefined,
        //   endDate: undefined,
        //   radios: "bg-info",
        //   eventTitle: undefined
        // });
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

      const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>, stateName: string) => {
        
        switch (stateName) {
          case "phone":
            setPhone({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
            break;
          case "email":
            setEmail({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
            break;
          case "firstname":
            setFirstName({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
            break;
          case "lastname":
            setLastName({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
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
                                    // onChange={e => handleSelectTime(e)}
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
