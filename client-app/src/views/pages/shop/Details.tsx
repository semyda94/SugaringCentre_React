import React, { useEffect, useContext, useState } from 'react'
import Cookies from 'universal-cookie';
import { Container, Card, Row, Col, CardHeader, Collapse, CardBody, CardText, CardTitle, CardImg, Button, Input, FormGroup, Form } from 'reactstrap'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import ProductStore from './../../../app/strore/productStores/productStore'
import { observer } from 'mobx-react-lite'

import "react-responsive-carousel/lib/styles/carousel.min.css";



const Details = (props: any) => {
    const productStore = useContext(ProductStore)
    const { loadProductForDetails, productDetails, productList, productImages, openedProductCollapses } = productStore;

    const cookies = new Cookies();

    const [qty, setQty] = useState(1)

    useEffect(() => {
        console.log(cookies.get('Cart'));

        loadProductForDetails(props.match.params.id);

        openedProductCollapses.push("collapseOne");
    }, [loadProductForDetails, props.match.params.id])

    const handleSubmitAddToCart = () => {
        const cartProductsArray = cookies.get('Cart');

        if (cartProductsArray === undefined) {
            cookies.set(
                'Cart',
                [{
                    productid: productDetails?.productId,
                    title: productDetails?.title,
                    shortDescription: productDetails?.shortDescription,
                    price: productDetails?.price,
                    qty: qty
                }],
                { path: '/' })
        } else {
            cartProductsArray.push(
                {
                    productid: productDetails?.productId,
                    title: productDetails?.title,
                    shortDescription: productDetails?.shortDescription,
                    price: productDetails?.price,
                    qty: qty
                }
            )

            cookies.set(
                'Cart',
                cartProductsArray,
                { path: '/' })
        }


    }

    const onQtyChange = (newValue: string) => {
        setQty(Number(newValue));
    }


    // with this function we create an array with the opened collapses
    // it is like a toggle function for all collapses from this page
    const collapsesToggle = (collapse: string) => {
        if (openedProductCollapses.includes(collapse)) {
            const indexToDelete = openedProductCollapses.indexOf(collapse);

            if (indexToDelete > -1) {
                openedProductCollapses.splice(indexToDelete, 1);
            }
        } else {
            openedProductCollapses.push(collapse);
        }
    };

    return (
        <div>
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

                <Card style={{ paddingTop: "70px", paddingBottom: "20px" }}>
                    <Row>
                        <Col md={6}>
                            <Container >
                                <Carousel showArrows={true} infiniteLoop={true}>
                                    {
                                        productDetails?.productImages?.map((image, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <img src={image.image} />
                                                </div>
                                            );
                                        })}
                                </Carousel>
                            </Container>
                        </Col>
                        <Col md={6}>
                            <h1 className="productDetailsTitle">{productDetails?.title}</h1>
                            <h3 className="productPrice">${productDetails?.price}</h3>

                            <div className="accordion">
                                <Card className="card-plain mb-0" style={{ boxShadow: "none" }}>
                                    <CardHeader
                                        role="tab"
                                        onClick={() => collapsesToggle("collapseOne")}
                                        aria-expanded={openedProductCollapses.includes(
                                            "collapseOne"
                                        )}
                                        style={{ paddingLeft: "0px", paddingBottom: "10px" }}
                                    >
                                        <h5 className="mb-0 productCaroselTitle">Description</h5>
                                    </CardHeader>
                                    <Collapse
                                        role="tabpanel"
                                        isOpen={openedProductCollapses.includes("collapseOne")}
                                    >
                                        <CardBody>
                                            <div className="productDescription">

                                                <div dangerouslySetInnerHTML={{ __html: productDetails ? productDetails.shortDescription : "" }} />
                                            </div>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                                <Card className="card-plain mb-0" style={{ boxShadow: "none" }}>
                                    <CardHeader
                                        role="tab"
                                        onClick={() => collapsesToggle("collapseTwo")}
                                        aria-expanded={openedProductCollapses.includes(
                                            "collapseTwo"
                                        )}
                                        style={{ paddingLeft: "0px", paddingTop: "0px" }}
                                    >
                                        <h5 className="mb-0 productCaroselTitle">Specification</h5>
                                    </CardHeader>
                                    <Collapse
                                        role="tabpanel"
                                        isOpen={openedProductCollapses.includes("collapseTwo")}
                                    >
                                        <CardBody>
                                            <div className="productDescription">
                                                <div dangerouslySetInnerHTML={{ __html: productDetails ? productDetails.desc : "" }} />
                                            </div>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                            </div>

                            <Form onSubmit={handleSubmitAddToCart}>
                                <Row style={{ paddingRight: "24px" }}>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Input
                                                defaultValue={1}
                                                id="input-price"
                                                placeholder="Price"
                                                type="number"
                                                min={1}
                                                step={1}
                                                onChange={e => onQtyChange(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ textAlign: "right" }}>
                                        <Button
                                            style={{
                                                backgroundColor: "rgba(255, 199, 40, 0.7)",
                                                borderColor: "rgba(255, 199, 40, 0.7)"
                                            }}
                                            type="submit">
                                            Add To Cart
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card>

            </Container>

            <Container fluid className="container">
                <h2 style={{
                    fontSize: "2.6em",
                    fontWeight: 300,
                    lineHeight: "1.5em",
                    fontFamily: 'Roboto',
                    color: "#3C4858",
                    textAlign: "center"
                }}
                >
                    You may also like:
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
                                            <CardText>
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
                                            </CardText>
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
        </div>
    )
}

export default observer(Details)
