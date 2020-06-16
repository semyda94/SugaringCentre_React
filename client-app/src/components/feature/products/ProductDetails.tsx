import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
// react plugin that creates text editor
import ReactQuill from "react-quill";
// javascript plugin that creates nice dropzones for files
import Dropzone from "dropzone";
import Select from 'react-select';

//Store
import ProuctStore from './../../../app/strore/productStores/productStore'
import CategoryStore from './../../../app/strore/productStores/categoryStore'

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
    Col
} from "reactstrap";

import { IProductImage } from '../../../app/models/products/productImage';
import { IProduct } from '../../../app/models/products/product';


interface IProp {
    selectedProduct: number;
}

const ProductDetails: React.FC<IProp> = ({ selectedProduct }) => {

    const productStore = useContext(ProuctStore)
    const categoryStore = useContext(CategoryStore)

    const { createProduct, updateProduct, productList } = productStore;
    const { categoryOption } = categoryStore

    const [title, setTitle] = useState("")
    const [titleValidState, setTitleValidState] = useState("invalid")
    const [price, setPrice] = useState("")
    const [priceValidState, setPriceValidState] = useState("invalid")
    const [desc, setDesc] = useState("")
    const [descValidState, setDescValidState] = useState("invalid")
    const [spec, setSpec] = useState("")
    const [specValidState, setSpecValidState] = useState("invalid")

    const [categories, setCategories] = useState("")
    const [specCategoriesState, setCategoriesValidState] = useState("invalid")

    Dropzone.autoDiscover = false;

    useEffect(() => {
        if (selectedProduct > -1) {
            setTitleValidState("valid");
            setPriceValidState("valid");
            setDescValidState("valid");
            setSpecValidState("valid");
        }

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

    const handleInputChange = (inputName: string, newValue: string) => {

        var newState = "invalid"
        if (newValue !== "" && newValue !== "<p><br></p>") {
            newState = "valid"
        }

        switch (inputName) {
            case "title":
                setTitle(newValue);
                setTitleValidState(newState);
                break;
            case "price":
                setPrice(newValue);
                setPriceValidState(newState);
                break;
            case "desc":
                setDesc(newValue);
                setDescValidState(newState);
                break;
            case "spec":
                setSpec(newValue);
                setSpecValidState(newState);
                break;
            default:
                break;
        }
    }

    const handleSelectChange = (e: any) => {
        // console.log(e);
        
        let newCategories = ""
        e.forEach((element:  any ) => {
            newCategories +=  element.value + ",";
        });

        
        setCategories(newCategories);
        setCategoriesValidState(newCategories === "" ? "invalid" : "valid")
    }

    const handleSubmit = () => {

        let filesToUpload: IProductImage[] = [];
        Dropzone.instances[0].getUploadingFiles().map((image) => {
            filesToUpload.push(
                {
                    productImageId: 0,
                    productId: selectedProduct === -1 ? 0 : selectedProduct,
                    image: image.dataURL!
                })
                return null;
        });

        const product: IProduct = {
            productId: selectedProduct === -1 ? 0 : selectedProduct,
            title: title,
            price: Number(price),
            desc: spec,
            shortDescription: desc,
            categorySelected: categories,
            productImages: filesToUpload
        }

        if (selectedProduct === -1)
            createProduct(product);
        else
            updateProduct(product);
    }

    return (
        <>
            <Row>
                <Col className="order-xl-2" xl="4">
                    <Card className="card-profile">
                        {/* <CardImg
                            alt="..."
                            src={require("./../../../assets/images/team-1-800x800.jpg")}
                            top
                        /> */}

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
                    <Row hidden={selectedProduct === -1}>
                        <Col lg="6">
                            <Card className="bg-gradient-success border-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                className="text-uppercase text-muted mb-0 text-white"
                                                tag="h5"
                                            >
                                                Total Oders
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
                                                Total Sold
                          </CardTitle>
                                            <span className="h2 font-weight-bold mb-0 text-white">
                                                49,65%
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
                                    <h3 className="mb-0">{selectedProduct === 0 ? "New product" : "Edit product"}</h3>
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
                                                    defaultValue={selectedProduct === -1 ? "" : productList[selectedProduct]?.title}
                                                    id="input-title"
                                                    placeholder="Title"
                                                    type="text"
                                                    onChange={e => handleInputChange("title", e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-price"
                                                >
                                                    Price
                            </label>
                                                <Input
                                                    defaultValue={selectedProduct === -1 ? "" : productList[selectedProduct]?.price}
                                                    id="input-price"
                                                    placeholder="Price"
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    onChange={e => handleInputChange("price", e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="selectCategories"
                                                >
                                                    Categories
                                                </label>
                                                <Select 
                                                    id="selectCategories" 
                                                    placeholder="Select categories" 
                                                    options={categoryOption} 
                                                    onChange={e => handleSelectChange(e)}
                                                    isMulti/>
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
                                                    defaultValue={selectedProduct === -1 ? "" : productList[selectedProduct]?.shortDescription}
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
                                <hr className="my-4" />

                                <h6 className="heading-small text-muted mb-4">
                                    Details
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
                                                    defaultValue={selectedProduct === -1 ? "" : productList[selectedProduct]?.desc}
                                                    onChange={e => handleInputChange("spec", e)}
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
                                                    titleValidState === "invalid" ||
                                                    priceValidState === "invalid" ||
                                                    descValidState === "invalid" ||
                                                    specValidState === "invalid"
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
    )
}

export default observer(ProductDetails)
