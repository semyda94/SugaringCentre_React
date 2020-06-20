import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';

// react plugin that creates text editor
import ReactQuill from "react-quill";

// javascript plugin that creates nice dropzones for files
import Dropzone from "dropzone";
import Select from 'react-select';

//Stores
import ServiceStore from './../../../../app/strore/serviceStores/serviceStore';
import ServiceCategoryStore from './../../../../app/strore/serviceStores/serviceCategoryStore';

//Models
import { IService } from './../../../../app/models/services/service'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    ListGroupItem,
    ListGroup,
    Row,
    Col,
    CardImg
} from "reactstrap";

import noImage from './../../../../assets/images/noimage.png'


interface IServiceDetailsProps {
    selectedService: number;
    modifyHook: React.Dispatch<React.SetStateAction<boolean>>;
}


const ServiceDetails: React.FC<IServiceDetailsProps> = ({ selectedService, modifyHook }) => {

    const serviceStore = useContext(ServiceStore);
    const serviceCategoryStore = useContext(ServiceCategoryStore);
    const { createService, loadServiceDetails, serviceDetails, updateService } = serviceStore;
    const { categoryOption, loadServiceCategory } = serviceCategoryStore

    const [title, setTitle] = useState({ value: "", state: "invalid" })
    const [price, setPrice] = useState({ value: "", state: "invalid" })
    const [category, setCategory] = useState({ value: "", state: "invalid" })
    const [selectedCategory, setSelectedCategory] = useState<{ value: number, label: string }>();
    const [duration, setDuration] = useState({ value: "", state: "invalid" })
    const [desc, setDesc] = useState({ value: "", state: "invalid" })

    const [previewImage, setPreviewImage] = useState(noImage);

    Dropzone.autoDiscover = false;

    useEffect(() => {
        if (selectedService > 0) {
            loadServiceDetails(selectedService);
        } else {
            setTitle({value: "", state: "invalid"})
            setPrice({value: "", state: "invalid"})
            setDuration({value: "", state: "invalid"})
            setCategory({value: "", state: "invalid"})
            setSelectedCategory(undefined);
            setDesc({value: "", state: "invalid"})

            setPreviewImage(noImage);
        }
    }, [selectedService])

    useEffect(() => {
        if (serviceDetails !== undefined) {
            setTitle({value: serviceDetails.title, state: serviceDetails.title === "" ? "invalid" : "valid"})
            setPrice({value: serviceDetails.price.toString(), state: serviceDetails.price.toString() === "" ? "invalid" : "valid"})
            setDuration({value: serviceDetails.duration.toString(), state: serviceDetails.duration.toString() === "" ? "invalid" : "valid"})
            setDesc({value: serviceDetails.duration.toString(), state: serviceDetails.duration.toString() === "" ? "invalid" : "valid"})
            setDesc({value: serviceDetails.serviceCategoryId.toString(), state: serviceDetails.serviceCategoryId.toString() === "" ? "invalid" : "valid"})

            setPreviewImage(serviceDetails.image);
            categoryOption.forEach(opt => {
                if (opt.value === Number(serviceDetails.serviceCategoryId)) {
                    setSelectedCategory({value: opt.value, label: opt.label});
                }
            });
        }

    }, [serviceDetails])

    useEffect(() => {
        loadServiceCategory();

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
            maxFiles: 1,
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
    }, [loadServiceCategory])


    const handleInputChange = (inputName: string, newValue: string) => {

        var newState = "invalid"
        if (newValue !== "" && newValue !== "<p><br></p>") {
            newState = "valid"
        }

        switch (inputName) {
            case "title":
                setTitle({ value: newValue, state: newState });
                break;
            case "price":
                setPrice({ value: newValue, state: newState });
                break;
            case "duration":
                setDuration({ value: newValue, state: newState });
                break;
            case "desc":
                setDesc({ value: newValue, state: newState });
                break;
            default:
                break;
        }
    }

    const handleSelectChange = (e: any) => {
        let newCategories = e.value

        setCategory({ value: newCategories, state: newCategories === "" ? "invalid" : "valid" });
        setSelectedCategory(e);
    }

    const handleSubmit = () => {
        let fileToUpload: string = ""
        console.log(Dropzone.instances[0].getUploadingFiles());

        if (Dropzone.instances[0].getUploadingFiles().length !== 0) {
            fileToUpload = Dropzone.instances[0].getUploadingFiles()[0].dataURL!;
        }

        const service: IService = {
            serviceId: selectedService,
            serviceCategoryId: Number(category.value),
            title: title.value,
            desc: desc.value,
            duration: Number(duration.value),
            price: Number(price.value),
            image: fileToUpload
        };

        if (selectedService === 0)
            createService(service);
        else
            updateService(service);

        modifyHook(false);
    }

    return (
        <>
            <Row>
                <Col className="order-xl-2" xl="4">
                    <Card className="card-profile">
                        <CardImg
                            alt="..."
                            src={previewImage}
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
                    <Row hidden={selectedService === 0}>
                        <Col lg="6">
                            <Card className="bg-gradient-success border-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                className="text-uppercase text-muted mb-0 text-white"
                                                tag="h5"
                                            >
                                                Total Bookings
                          </CardTitle>
                                            <span className="h2 font-weight-bold mb-0 text-white">
                                                350,897
                          </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                                <i className="ni ni-active-40" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="bg-gradient-danger border-0" tag="h5">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle className="text-uppercase text-muted mb-0 text-white">
                                                Total Amount
                          </CardTitle>
                                            <span className="h2 font-weight-bold mb-0 text-white">
                                                $
                          </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                                <i className="ni ni-spaceship" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col xs="12">
                                    <h3 className="mb-0">{selectedService === 0 ? "New product" : "Edit product"}</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form className="needs-validation" noValidate onSubmit={handleSubmit}>
                                <h6 className="heading-small text-muted mb-4">
                                    Main product information
                    </h6>
                                <div className="pl-lg-4">
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
                                                    value={title.value}
                                                    id="input-title"
                                                    placeholder="Title"
                                                    type="text"
                                                    onChange={e => handleInputChange("title", e.target.value)}
                                                    valid={title.state !== "invalid"}
                                                    invalid={title.state === "invalid"}
                                                />
                                                <div className="invalid-feedback">Title shouldn't be empty</div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-price"
                                                >
                                                    Price (NZD)
                            </label>
                                                <Input
                                                    value={price.value}
                                                    id="input-price"
                                                    placeholder="Price"
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    onChange={e => handleInputChange("price", e.target.value)}
                                                    valid={price.state !== "invalid"}
                                                    invalid={price.state === "invalid"}
                                                />
                                                <div className="invalid-feedback">Price should be larger than 0</div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="selectCategory"
                                                >
                                                    Category
                                                </label>
                                                <Select
                                                    value={selectedCategory}
                                                    id="selectCategory"
                                                    placeholder="Select category"
                                                    options={categoryOption}
                                                    onChange={e => handleSelectChange(e)} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-duration"
                                                >
                                                    Duration (Min)
                            </label>
                                                <Input
                                                    value={duration.value}
                                                    id="input-duration"
                                                    placeholder="Duration"
                                                    type="number"
                                                    min={0}
                                                    step={1}
                                                    onChange={e => handleInputChange("duration", e.target.value)}
                                                    valid={duration.state !== "invalid"}
                                                    invalid={duration.state === "invalid"}
                                                />
                                                <div className="invalid-feedback">Duration should be larger than 0</div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className="my-4" />

                                <h6 className="heading-small text-muted mb-4">
                                    Description
                    </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <div
                                                    data-quill-placeholder="Quill WYSIWYG"
                                                    data-toggle="quill"
                                                />
                                                <ReactQuill
                                                    onChange={e => handleInputChange("desc", e)}
                                                    // defaultValue={selectedService === 0 ? "" : serviceList[selectedService]?.shortDescription}
                                                    theme="snow"
                                                    modules={{
                                                        toolbar: [
                                                            ["bold", "italic"],
                                                            ["link", "blockquote"],
                                                            [
                                                                {
                                                                    list: "ordered"
                                                                },
                                                                {
                                                                    list: "bullet"
                                                                }
                                                            ]
                                                        ]
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="pl-lg-4" style={{ textAlign: "center" }}>
                                    <Row>
                                        <Col>
                                            <Button
                                                color="success"
                                                type="submit"
                                                disabled=
                                                {
                                                    title.state === "invalid" ||
                                                    price.state === "invalid" ||
                                                    category.state === "invalid" ||
                                                    duration.state === "invalid" ||
                                                    desc.state === "invalid"
                                                    // Dropzone.instances[0].getUploadingFiles().length === 0
                                                }
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default observer(ServiceDetails)