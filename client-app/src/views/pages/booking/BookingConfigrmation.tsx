import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Card, Row, Col, Input, FormGroup, Button, Form } from 'reactstrap';

import Calendar, { CalendarTileProperties } from 'react-calendar';
import Select from 'react-select';
import ReactNotification, {store} from 'react-notifications-component'

import ServiceStore from '../../../app/strore/serviceStores/serviceStore';
import StaffStore from '../../../app/strore/staffStore'
import BookingStore from '../../../app/strore/bookingStore'

import 'react-notifications-component/dist/theme.css'
import 'react-calendar/dist/Calendar.css';
import './../../../assets/css/booking-confirmation.css';

import { history } from '../../../';

const BookingConfigrmation = (props: any) => {
  const serviceStore = useContext(ServiceStore);
  const staffStore = useContext(StaffStore);
  const bookingStore = useContext(BookingStore);

  const { loadServiceDetails, serviceDetails, loadMasters, masterOptions } = serviceStore;
  const { workingDaysOfStaff, loadTimeOptionsForDate, workingDaysOfSelectedStaff, timeOptions } = staffStore;
  const { createBooking } = bookingStore;

  const [masterSelected, setmasterSelected] = useState<{ value: number, label: string } | undefined>(undefined);
  const [dateSelected, setdateSelected] = useState<string | undefined>(undefined);
  const [timeSelected, settimeSelected] = useState<{ value: Date, label: string } | undefined>(undefined);
  const [firstName, setfirstName] = useState({ value: "", state: "invalid" })
  const [lastName, setlastName] = useState({ value: "", state: "invalid" })
  const [email, setEmail] = useState({ value: "", state: "invalid" })
  const [phone, setPhone] = useState({ value: "", state: "invalid" })

  useEffect(() => {
    loadServiceDetails(props.match.params.id);
    loadMasters(props.match.params.id);

  }, [loadServiceDetails, loadMasters, props.match.params.id])

  const validateDateDisabled = (props: CalendarTileProperties & { activeStartDate: Date; }): boolean => {
    return workingDaysOfSelectedStaff.find(d => d === props.date.getDay()) === undefined;
  }

  const handleSelectMaster = async (selection: any) => {
    setmasterSelected({ value: selection.value, label: selection.label });
    workingDaysOfStaff(selection.value);
  }

  const handleSelectDate = (e: any) => {
    loadTimeOptionsForDate(masterSelected?.value!, serviceDetails?.serviceId!, e)
    setdateSelected(e.toDateString());
  }

  const handleSelectTime = (selection: any) => {
    settimeSelected({ value: selection.value, label: selection.label });
  }

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>, stateName: string) => {
    console.log(e.target.value);
    
    switch (stateName) {
      case "phone":
        setPhone({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
        break;
      case "email":
        setEmail({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
        break;
      case "firstname":
        setfirstName({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
        break;
      case "lastname":
        setlastName({value: e.target.value, state: e.target.value === "" ? "invalid" : "valid"});
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = () => {
    createBooking({
      bookingId: 0,
      serviceId: serviceDetails?.serviceId!,
      staffId: masterSelected?.value!,
      date: new Date(dateSelected!),
      time: timeSelected?.label!,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value
    }, masterSelected!.label
    );

    store.addNotification({
      title: "Booked!",
      message: "Your booking has been submited. You should get confirmation email/text",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
      },
      onRemoval: (id, removedBy) => {
        history.push('/');
        window.location.reload(false);
      }
    });
  }

  return (
    <div>
      <ReactNotification />
      <div style={{
        minHeight: "375px",
        maxHeight: "540px",
        width: "100%"
      }}>
        <div className="shopHeader">
        </div>
      </div>

      <Container fluid className="container "
        style={{
          marginTop: "-12.5rem"
        }}>

        <Card style={{ paddingTop: "70px", paddingBottom: "20px", textAlign: "center" }}>
          <Form noValidate>
            <Row>
              <Col md={6}>
                <Container>
                  <h1 style={{
                    fontSize: "1.79em",
                    lineHeight: "1em",
                    fontFamily: "Roboto",
                    fontWeight: 300,
                    color: "#3c4858"
                  }}>Schedule Online</h1>

                  <hr className="divider-w pt-20" />

                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="selectMaster"
                    >
                      Master
                                                </label>
                    <Select
                      id="selectMaster"
                      placeholder="Select master"
                      options={masterOptions}
                      onChange={e => handleSelectMaster(e)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-date"
                    >
                      Date
                            </label>

                    <Calendar
                      className="bookingDate"
                      minDate={new Date()}
                      tileDisabled={validateDateDisabled}
                      onChange={e => handleSelectDate(e)}
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

                  <h1 style={{
                    fontSize: "1.79em",
                    lineHeight: "1em",
                    fontFamily: "Roboto",
                    fontWeight: 300,
                    color: "#3c4858"
                  }}>Tell us a bit about you</h1>

                  <hr className="divider-w pt-20" />

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

                </Container>
              </Col>

              <Col md={6} style={{ textAlign: "center" }}>
                <div id="floatingRectangle">
                  <span style={{
                    fontSize: "1.79em",
                    lineHeight: "1em",
                    fontFamily: "Roboto",
                    fontWeight: 300,
                    color: "#3c4858"
                  }}
                  >
                    {serviceDetails?.title}</span>
                  <div>
                    <span>${serviceDetails?.price} | {serviceDetails?.duration} Min</span>
                  </div>

                  <hr className="divider-w pt-20" style={{ color: "black" }} />

                  <Input
                    value={masterSelected === undefined ? "Master not selected" : masterSelected.label}
                    id="input-price"
                    type="text"
                    disabled
                  />
                  <Input
                    value={dateSelected === undefined ? "Date not selected" : dateSelected}
                    id="input-price"
                    type="text"
                    disabled
                  />
                  <Input
                    value={timeSelected === undefined ? "Time not selected" : timeSelected.label}
                    id="input-price"
                    type="text"
                    disabled
                  />
                  <div>
                    <Button
                      disabled={
                        masterSelected === undefined ||
                        dateSelected === undefined ||
                        timeSelected === undefined ||
                        firstName.state === "invalid" || 
                        lastName.state === "invalid" ||
                        email.state === "invalid" || 
                        phone.state === "invalid"
                      }
                      className="bookItButton"
                      onClick={handleOnSubmit}
                      >Book It</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>

  )
}

export default observer(BookingConfigrmation)
