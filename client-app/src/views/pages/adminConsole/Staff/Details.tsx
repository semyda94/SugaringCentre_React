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

import React, { useState, useEffect, useContext } from 'react'
import { observable } from 'mobx';

// javascript plugin that creates nice dropzones for files
import Dropzone from "dropzone";
import Select from 'react-select';

// Interfaces
import { IStaffImage } from './../../../../app/models/staff/staffImage'
import { IStaff } from './../../../../app/models/staff/staff'

//Sotre
import StaffStore from './../../../../app/strore/staffStore'
import ServiceCategoryStore from './../../../../app/strore/serviceStores/serviceCategoryStore'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    CardImg
} from "reactstrap";

import ProductCategoriesHeader from '../../../../components/Headers/ProductCategoriesHeader';
import moment from 'moment';

interface DetailParams {
    selectedStaff?: string;
}


const Details = () => {

    const staffStore = useContext(StaffStore)
    const serviceCategoryStore = useContext(ServiceCategoryStore);

    const { createStaff } = staffStore
    const { loadServiceCategory, categoryOption } = serviceCategoryStore;

    const [username, setUsername] = useState({ value: "", state: "invalid" })
    const [email, setEmail] = useState({ value: "", state: "invalid" })
    const [firstName, setFirstName] = useState({ value: "", state: "invalid" })
    const [lastName, setLastName] = useState({ value: "", state: "invalid" })
    const [title, setTitle] = useState({ value: "", state: "invalid" })
    const [dob, setDob] = useState({ value: "", state: "invalid" })
    const [address, setAddress] = useState({ value: "", state: "invalid" })
    const [city, setCity] = useState({ value: "", state: "invalid" })
    const [country, setCountry] = useState({ value: "", state: "invalid" })
    const [postalCode, setPostalCode] = useState({ value: "", state: "invalid" })
    const [categories, setCategories] = useState({ value: "", state: "invalid" })
    const [workingDays, setWorkingDays] = useState({ value: "", state: "invalid" })
    const [timeStart, setTimeStart] = useState({ value: "", state: "invalid" })
    const [timeEnd, setTimeEnd] = useState({ value: "", state: "invalid" })
    

    Dropzone.autoDiscover = false;

    useEffect(() => {
        loadServiceCategory()

        // this variable is to delete the previous image from the dropzone state
        // it is just to make the HTML DOM a bit better, and keep it light
        let currentMultipleFile: any = undefined;
        // multiple dropzone file - accepts any type of file
        let dropelement = document.getElementById("dropzone-multiple");
        let previewContainer = document.getElementsByClassName("dz-preview-multiple")[0]
        new Dropzone(dropelement === null ? "" : dropelement, {
            url: "https://",
            thumbnailWidth: undefined,
            thumbnailHeight: undefined,
            previewsContainer: (previewContainer as HTMLElement),
            previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
                .innerHTML,
            maxFiles: 5,
            acceptedFiles: undefined,
            init: function () {
                this.on("addedfile", function (file: any) {
                    if (currentMultipleFile) {
                    }
                    currentMultipleFile = file;
                });
            }
        });
        document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
    }, [])


    const InputChanged = (e: React.ChangeEvent<HTMLInputElement>, stateName: string) => {
        switch (stateName) {
            case "username":
                let newUsername = username;
                newUsername.value = e.target.value;
                newUsername.state = e.target.value === "" ? "invalid" : "valid";

                setUsername(newUsername);
                break;
            case "email":
                let newEmail = email;
                newEmail.value = e.target.value;
                newEmail.state = e.target.value === "" ? "invalid" : "valid";

                setEmail(newEmail);
                break;
            case "firstname":
                let newFirstName = firstName;
                newFirstName.value = e.target.value;
                newFirstName.state = e.target.value === "" ? "invalid" : "valid";

                setFirstName(newFirstName);
                break;
            case "lastname":
                let newLastName = lastName;
                newLastName.value = e.target.value;
                newLastName.state = e.target.value === "" ? "invalid" : "valid";

                setLastName(newLastName);
                break;
            case "title":
                let newTitle = title;
                newTitle.value = e.target.value;
                newTitle.state = e.target.value === "" ? "invalid" : "valid";

                setTitle(newTitle);
                break;
            case "dob":
                let newDob = dob;
                newDob.value = e.target.value;
                newDob.state = e.target.value === "" ? "invalid" : "valid";

                setDob(newDob);
                break;
            case "address":
                let newAddress = address;
                newAddress.value = e.target.value;
                newAddress.state = e.target.value === "" ? "invalid" : "valid";

                setAddress(address);
                break;
            case "city":
                let newCity = city;
                newCity.value = e.target.value;
                newCity.state = e.target.value === "" ? "invalid" : "valid";

                setCity(newCity);
                break;
            case "country":
                let newCountry = country;
                newCountry.value = e.target.value;
                newCountry.state = e.target.value === "" ? "invalid" : "valid";

                setCountry(newCountry);
                break;
            case "postcode":
                let newPostCode = postalCode;
                newPostCode.value = e.target.value;
                newPostCode.state = e.target.value === "" ? "invalid" : "valid";

                setPostalCode(newPostCode);
                break;

            case "timestart":
                let newTimeStart = timeStart;
                newTimeStart.value = e.target.value;
                newTimeStart.state = e.target.value === "" ? "invalid" : "valid";

                setTimeStart(newTimeStart);
                break;
            case "timeend":
                let newTimeEnd = timeEnd;
                newTimeEnd.value = e.target.value;
                newTimeEnd.state = e.target.value === "" ? "invalid" : "valid";

                setTimeEnd(newTimeEnd);
                break;
            default:
                break;
        }
    };

    const handleSelectChange = (e: any, select: string) => {

        switch (select) {
            case "selectWorkingDays":
                let newWorkingDaysValues = ""
                e.forEach((element: any) => {
                    newWorkingDaysValues += element.value + ",";
                });

                setWorkingDays({ value: newWorkingDaysValues, state: newWorkingDaysValues === "" ? "invalid" : "valid" });
                break;

            case "selectCategories":
                let newCategories = ""
                e.forEach((element: any) => {
                    newCategories += element.value + ",";
                });

                setCategories({ value: newCategories, state: newCategories === "" ? "invalid" : "valid" });
                break;
            default:
                break;
        }


    }

    const handleSubmit = () => {

        if (username.state === "valid") {
            let filesToUpload: IStaffImage[] = [];
            Dropzone.instances[0].getUploadingFiles().map((image) => {
                filesToUpload.push(
                    {
                        staffImageId: 0,
                        // staffId: selectedStaff === -1 ? 0 : selectedProduct,
                        staffId: 0,
                        image: image.dataURL!
                    })
                return null;
            });

            const staff: IStaff = {
                staffId: 0,
                username: username.value,
                firstName: firstName.value,
                lastName: lastName.value,
                title: title.value,
                dob: new Date(dob.value),

                workingDaysOfWeek: workingDays.value,
                workingFrom: moment(timeStart.value, "h:mm a").toDate(),
                workingTo: moment(timeEnd.value, "h:mm a").toDate(),

                servicesStaff: categories.value,

                staffImage: filesToUpload,
                bookings: null,
                serviceStaff: [],
                leaves: []
            }

            createStaff(staff);
            // if (selectedProduct === -1)
            //     createProduct(product);
            // else
            //     updateProduct(product);
        }
    }

    return (
        <>
            <ProductCategoriesHeader name="Create New Staff Member" parentName="Staff List" action={() => { }} />

            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile">
                            <CardImg
                                alt="..."
                                src={require("./../../../../assets/images/team-1-800x800.jpg")}
                                top
                            />

                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">

                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div
                                    className="dropzone dropzone-multiple"
                                    id="dropzone-multiple"
                                >
                                    <div className="fallback">
                                        <div className="custom-file">
                                            <input
                                                className="custom-file-input"
                                                id="customFileUploadMultiple"
                                                multiple
                                                type="file"
                                            />
                                            <label
                                                className="custom-file-label"
                                                htmlFor="customFileUploadMultiple"
                                            >
                                                Choose file
                          </label>
                                        </div>
                                    </div>
                                    <ListGroup
                                        className=" dz-preview dz-preview-multiple list-group-lg"
                                        flush
                                    >
                                        <ListGroupItem className=" px-0">
                                            <Row className=" align-items-center">
                                                <Col className=" col-auto">
                                                    <div className=" avatar">
                                                        <img
                                                            alt="..."
                                                            className=" avatar-img rounded"
                                                            data-dz-thumbnail
                                                            src="..."
                                                        />
                                                    </div>
                                                </Col>
                                                <div className=" col ml--3">
                                                    <h4 className=" mb-1" data-dz-name>
                                                        ...
                              </h4>
                                                    <p
                                                        className=" small text-muted mb-0"
                                                        data-dz-size
                                                    >
                                                        ...
                              </p>
                                                </div>
                                                <Col className=" col-auto">
                                                    <Button size="sm" color="danger" data-dz-remove>
                                                        <i className="fas fa-trash" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="12">
                                        <h3 className="mb-0">New member</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">
                                        Main information
                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Username
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={username.value}
                                                        id="input-username"
                                                        placeholder="Username"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "username")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Email address
                            </label>
                                                    <Input
                                                        defaultValue={email.value}
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        placeholder="example@example.com"
                                                        type="email"
                                                        onChange={e => InputChanged(e, "email")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={firstName.value}
                                                        id="input-first-name"
                                                        placeholder="First name"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "firstname")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Last name
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={lastName.value}
                                                        id="input-last-name"
                                                        placeholder="Last name"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "lastname")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-title"
                                                    >
                                                        Title
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={title.value}
                                                        id="input-title"
                                                        placeholder="Title"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "title")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dob"
                                                    >
                                                        Day of birth
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={dob.value}
                                                        id="input-dob"
                                                        placeholder="Day of birth"
                                                        type="date"
                                                        onChange={e => InputChanged(e, "dob")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Contact information
                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-address"
                                                    >
                                                        Address
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={address.value}
                                                        id="input-address"
                                                        placeholder="Home Address"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "address")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        City
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={city.value}
                                                        id="input-city"
                                                        placeholder="City"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "city")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Country
                            </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={country.value}
                                                        id="input-country"
                                                        placeholder="Country"
                                                        type="text"
                                                        onChange={e => InputChanged(e, "country")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Postal code
                            </label>
                                                    <Input
                                                        defaultValue={postalCode.value}
                                                        className="form-control-alternative"
                                                        id="input-postal-code"
                                                        placeholder="Postal code"
                                                        type="number"
                                                        onChange={e => InputChanged(e, "postcode")}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {/* Working days and hours */}
                                    <h6 className="heading-small text-muted mb-4">Working days and hours</h6>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="selectWorkingDays"
                                                >
                                                    Working Days
                                                </label>
                                                <Select
                                                    id="selectWorkingDays"
                                                    placeholder="Select working days"
                                                    options={[
                                                        { value: 1, label: "Monday" },
                                                        { value: 2, label: "Tuesday" },
                                                        { value: 3, label: "Wednesday" },
                                                        { value: 4, label: "Thursday" },
                                                        { value: 5, label: "Friday" },
                                                        { value: 6, label: "Saturday" },
                                                        { value: 0, label: "Sunday" }
                                                    ]}
                                                    onChange={e => handleSelectChange(e, "selectWorkingDays")}
                                                    isMulti />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="selectCategories"
                                                >
                                                    Working Days
                                                </label>
                                                <Select
                                                    id="selectCategories"
                                                    placeholder="Select Categories"
                                                    options={categoryOption}
                                                    onChange={e => handleSelectChange(e, "selectCategories")}
                                                    isMulti />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-time-start"
                                                >
                                                    Day starts
                            </label>
                                                <Input
                                                    defaultValue={timeStart.value === "" ? "10:30:00" : timeStart.value}
                                                    id="input-time-start"
                                                    type="time"
                                                    onChange={e => InputChanged(e, "timestart")}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-time-end"
                                                >
                                                    Day Ends
                            </label>
                                                <Input
                                                    defaultValue={timeEnd.value === "" ? "18:30:00" : timeEnd.value}
                                                    id="input-time-end"
                                                    type="time"
                                                    onChange={e => InputChanged(e, "timeend")}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <hr className="my-4" />
                                    <Row>
                                        <Col lg="6" style={{ textAlign: "right" }}>
                                            <Button
                                                color="success"
                                                type="submit"
                                            >
                                                Create
                                            </Button>
                                        </Col>
                                        <Col lg="6" style={{ textAlign: "left" }}>
                                            <Button
                                                color="danger"
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Details
