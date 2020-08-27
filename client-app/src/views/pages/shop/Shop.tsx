import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, CardImg, CardHeader, CardBody, CardTitle, CardText, Collapse } from 'reactstrap'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

import ProductStore from './../../../app/strore/productStores/productStore'
import CategoryStore from './../../../app/strore/productStores/categoryStore'

import shopHeader from './../../../assets/images/shopHeader.jpg'

// plugin that creates slider
import Slider from "nouislider";

import 'typeface-roboto'



const Shop = () => {

    const productStore = useContext(ProductStore);
    const categoryStore = useContext(CategoryStore);
    const { loadImageForProduct, loadProductsForShop, productList, filteredList, productImages, openedCollapses, priceSliderValues, updateSelectedCategory, updatePrice } = productStore
    const { loadCategory, categoryList } = categoryStore

    useEffect(() => {
        const fetchData = async () => {
            await loadCategory();
            await loadProductsForShop();

            const slider = Slider.create(document.getElementById("priceSlider")!, {
                start: [0, 1000],
                connect: [false, true, false],
                step: 0.01,
                range: { min: priceSliderValues[0], max: priceSliderValues[1] },
                // connect: true,
            });

            slider.on(
                "set",
                function (values: number[]) {
                    console.log("Update");
                    updatePrice(priceSliderValues[0], priceSliderValues[1]);
                }
            );

            slider.on(
                "update",
                function (values: number[]) {
                    priceSliderValues[0] = values[0];
                    priceSliderValues[1] = values[1];
                }
            )
        }

        fetchData();
    }, [])

    // with this function we create an array with the opened collapses
    // it is like a toggle function for all collapses from this page
    const collapsesToggle = (collapse: string) => {
        if (openedCollapses.includes(collapse)) {
            const indexToDelete = openedCollapses.indexOf(collapse);

            if (indexToDelete > -1) {
                openedCollapses.splice(indexToDelete, 1);
            }
        } else {
            openedCollapses.push(collapse);
        }
    };

    const CategoryChanged = (id: number) => {
        console.log(id)
        updateSelectedCategory(id);
    }

    return (
        <div>
            <div style={{
                minHeight: "375px",
                maxHeight: "540px",
                width: "100%"
            }}>
                <div className="shopHeader">
                    <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <h1 className="headerTitle">Sugaring Shop a welocome you!</h1>
                        <h4 className="headerTitle">Sugaring Shop a welocome your!</h4>
                    </div>
                </div>
            </div>
            <Container className="mt--6" fluid>
                <Card style={{ paddingTop: "70px", paddingBottom: "70px" }}>
                    <Container className="container" >
                        <h2 style={{
                            fontSize: "2.6em",
                            fontWeight: 300,
                            lineHeight: "1.5em",
                            fontFamily: 'Roboto',
                            color: "#3C4858"
                        }}
                        >Find what you look for</h2>
                        <Row>
                            <Col md={3}>
                                {/* <ProductsTable trigerEdit={handleModifyProduct}/> */}
                                <div className="accordion">
                                    <Card className="card-plain mb-0">
                                        <CardHeader
                                            role="tab"
                                            onClick={() => collapsesToggle("collapseOne")}
                                            aria-expanded={openedCollapses.includes(
                                                "collapseOne"
                                            )}
                                        >
                                            <h5 className="mb-0">Price</h5>
                                        </CardHeader>
                                        <Collapse
                                            role="tabpanel"
                                            isOpen={openedCollapses.includes("collapseOne")}
                                        >
                                            <PerfectScrollbar>
                                                <CardBody>
                                                    <div className="">
                                                        <div id="priceSlider" />
                                                        <Row>
                                                            <Col xs="6">
                                                                <span className="range-slider-value value-low">
                                                                    ${priceSliderValues[0]}
                                                                </span>
                                                            </Col>
                                                            <Col className="text-right" xs="6">
                                                                <span className="range-slider-value value-high">
                                                                    ${priceSliderValues[1]}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </CardBody>
                                            </PerfectScrollbar>
                                        </Collapse>
                                    </Card>
                                    <Card className="card-plain mb-0">
                                        <CardHeader
                                            role="tab"
                                            onClick={() => collapsesToggle("collapseTwo")}
                                            aria-expanded={openedCollapses.includes(
                                                "collapseTwo"
                                            )}
                                        >
                                            <h5 className="mb-0">Category</h5>
                                        </CardHeader>
                                        <Collapse
                                            role="tabpanel"
                                            isOpen={openedCollapses.includes("collapseTwo")}
                                        >
                                            <PerfectScrollbar>
                                                <CardBody>
                                                    {categoryList.map((category, idx) => {
                                                        return (
                                                            <div className="custom-control custom-checkbox" key={idx}>
                                                                <input
                                                                    className="custom-control-input"
                                                                    id={"customCheck" + idx}
                                                                    type="checkbox"
                                                                    onChange={e => CategoryChanged(category.categoryId)}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor={"customCheck" + idx}
                                                                >
                                                                    {category.name}
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </CardBody>
                                            </PerfectScrollbar>
                                        </Collapse>
                                    </Card>
                                    {/* <Card className="card-plain">
                                        <CardHeader
                                            role="tab"
                                            onClick={() => collapsesToggle("collapseThree")}
                                            aria-expanded={openedCollapses.includes(
                                                "collapseThree"
                                            )}
                                        >
                                            <h5 className="mb-0">Collapsible Group Item #3</h5>
                                        </CardHeader>
                                        <Collapse
                                            role="tabpanel"
                                            isOpen={openedCollapses.includes("collapseThree")}
                                        >
                                            <CardBody>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life
                                                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                                non cupidatat skateboard dolor brunch. Food truck quinoa
                                                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                                aliqua put a bird on it squid single-origin coffee nulla
                                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                                beer labore wes anderson cred nesciunt sapiente ea proident.
                                                Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you
                                                probably haven't heard of them accusamus labore sustainable
                                                VHS.
              </CardBody>
                                        </Collapse>
                                    </Card> */}
                                </div>
                            </Col>

                            <Col md={9}>
                                <Row>
                                    {
                                        filteredList.map((product, idx) => {
                                            return (
                                                <Col md={4} key={idx}>
                                                    <Card style={{
                                                        boxShadow: "none"
                                                    }}>
                                                        <CardImg
                                                            alt="..."
                                                            src={productImages.get(product.productId)}
                                                            top
                                                            style={{
                                                                height: "20rem",
                                                                objectFit: "contain",
                                                                borderRadius: "12px"
                                                            }}
                                                        />
                                                        <CardBody style={{ padding: 0 }}>
                                                            <CardTitle style={{ textAlign: "center" }}>
                                                                <Link to={`/shop/details/${product.productId}`} >
                                                                    <h4 style={
                                                                        {
                                                                            color: "#3C4858",
                                                                            textDecoration: "none",
                                                                            fontFamily: "Times New Roman",
                                                                            fontWeight: 700,
                                                                            fontSize: "1.3em",
                                                                            lineHeight: "1.55em",
                                                                            // marginBottom: "10px",
                                                                            // marginTop: "10px"
                                                                        }}>
                                                                        {product.title}
                                                                    </h4>
                                                                </Link>
                                                            </CardTitle>
                                                            {/* <CardText>
                                                                <span style={
                                                                    {
                                                                        color: "#999999",
                                                                        fontFamily: "Helvetica Arial",
                                                                        fontWeight: 300,
                                                                        lineHeight: "1.5em"
                                                                    }
                                                                }>
                                                                    {product.shortDescription}
                                                                </span>
                                                            </CardText> */}
                                                            <CardText style={{ textAlign: "center" }}>
                                                                <span style={
                                                                    {
                                                                        color: "#999999",
                                                                        fontFamily: "Helvetica Arial",
                                                                        fontWeight: 300,
                                                                        lineHeight: "1.5em"
                                                                    }
                                                                }>
                                                                    ${product.price}
                                                                </span>
                                                            </CardText>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                        )
                                    }
                                </Row>


                                {/* <ProductsTable trigerEdit={handleModifyProduct}/> */}
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Container>

            <Container fluid className="container" style={{ paddingBottom: "70px", paddingTop: "70px" }}>
                <h2 style={{
                    fontSize: "2.6em",
                    fontWeight: 300,
                    lineHeight: "1.5em",
                    fontFamily: 'Roboto',
                    color: "#3C4858"
                }}
                >
                    Newest products
                </h2>
                <Row>
                    {
                        productList.slice(0, 3).map((product, idx) => {
                            return (
                                <Col md={4} key={idx}>
                                    <Card style={{
                                        marginTop: "30px"
                                    }}>
                                        <CardImg
                                            alt="..."
                                            src={productImages.get(product.productId)}
                                            top
                                            className="mt--3"
                                            style={{
                                                height: "20rem",
                                                objectFit: "contain",
                                                borderRadius: "12px"
                                            }}
                                        />
                                        <CardBody style={{ padding: 0 }}>
                                            <CardTitle style={{ textAlign: "center" }}>
                                                <Link to={`/shop/details/${product.productId}`} >
                                                    <h4 style={
                                                        {
                                                            color: "#3C4858",
                                                            textDecoration: "none",
                                                            fontFamily: "Times New Roman",
                                                            fontWeight: 700,
                                                            fontSize: "1.3em",
                                                            lineHeight: "1.55em",
                                                            marginBottom: "10px",
                                                            marginTop: "10px"
                                                        }}>
                                                        {product.title}
                                                    </h4>
                                                </Link>
                                            </CardTitle>
                                            {/* <CardText>
                                                <span style={
                                                    {
                                                        color: "#999999",
                                                        fontFamily: "Helvetica Arial",
                                                        fontWeight: 300,
                                                        lineHeight: "1.5em"
                                                    }
                                                }>
                                                    {product.shortDescription}
                                                </span>
                                            </CardText> */}
                                            <CardText style={{ textAlign: "center" }}>
                                                <span style={
                                                    {
                                                        color: "#999999",
                                                        fontFamily: "Helvetica Arial",
                                                        fontWeight: 300,
                                                        lineHeight: "1.5em"
                                                    }
                                                }>
                                                    ${product.price}
                                                </span>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        }
                        )
                    }
                </Row>

            </Container>
        </div >
    )
}

export default observer(Shop)
