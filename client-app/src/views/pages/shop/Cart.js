import React, { useEffect, useContext, useState, useRef } from "react";
import Cookies from "universal-cookie";
import {
  Card,
  Container,
  CardHeader,
  CardFooter,
  Row,
  Col,
  UncontrolledTooltip,
  Table,
} from "reactstrap";

import OrderStore from "./../../../app/strore/orderStore";

// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

import { history } from "./../../../index";

const Cart = () => {
  const cookies = new Cookies();

  const orderStore = useContext(OrderStore);
  const { createOrder } = orderStore;

  const [productsFromCoockies, setproductsFromCoockies] = useState();
  const [totalAmount, settotalAmount] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  let paypalRef = useRef();
  let notificationRef = useRef();

  const handlerReadCoockies = () => {
    setproductsFromCoockies(cookies.get("Cart"));

    if (productsFromCoockies) {
      let newTotal = 0;
      productsFromCoockies.map((product) => {
        newTotal += product.qty * product.price;
      });

      settotalAmount(newTotal);
    }
  };

  const handleDeleteFromCart = (id) => {
    let productIndexToDelete = -1;
    productsFromCoockies.map((product, idx) => {
      if (Number(product.productid) === id) {
        productIndexToDelete = idx;
      }
    });

    if (productIndexToDelete > -1) {
      const newProductForCoockies = productsFromCoockies;
      productsFromCoockies.splice(productIndexToDelete, 1);

      setproductsFromCoockies(productsFromCoockies);
      cookies.set("Cart", newProductForCoockies);
    }
  };

  useEffect(() => {
    handlerReadCoockies();

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARNbFguZBa3gmeTyiwnw_fBc9H2SBVMf9kJf47ci9x7xbVVAX7lD5ZuJ1nxvUJLLI2SAfG7p5x5PRPaH&currency=NZD&intent=capture&components=buttons&buyer-country=NZ";
    script.addEventListener("load", () => setLoaded(true));

    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            intent: "authorize",
            createOrder: (data, actions) => {
              let totalForPayPal = 0;
              var productsToDisplay = [];
              productsFromCoockies.map((product, idx) => {
                productsToDisplay.push({
                  name: product.title,
                  unit_amount: {
                    currency_code: "NZD",
                    value: product.price,
                  },
                  quantity: product.qty,
                });

                totalForPayPal += product.qty * product.price;
              });
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "NZD",
                      value: totalForPayPal,
                      breakdown: {
                        item_total: {
                          currency_code: "NZD",
                          value: totalForPayPal,
                        },
                      },
                    },
                    items: productsToDisplay,
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();

              var orderItems = [];

              productsFromCoockies.map((product, idx) => {
                orderItems.push({
                  productId: product.productid,
                  name: product.title,
                  qty: product.qty,
                  amount: Number(product.price),
                });
              });

              const orderToCreate = {
                externalId: order.id,
                firstName: order.payer.name.given_name,
                lastName: order.payer.name.surname,
                email: order.payer.email_address,
                address:
                  order.purchase_units[0].shipping.address.address_line_1 +
                  "," +
                  order.purchase_units[0].shipping.address.admin_area_2 +
                  "," +
                  order.purchase_units[0].shipping.address.country_code +
                  "," +
                  order.purchase_units[0].shipping.address.postal_code,
                amount: Number(order.purchase_units[0].amount.value),
                date: order.create_time,
                orderItems: orderItems,
              };

              console.log(orderToCreate);

              createOrder(orderToCreate);
              cookies.remove("Cart");
              history.push("/");

              //   setPaymentProcessing(true);
            },
          })
          .render(paypalRef.current);
      });
    }
  }, [loaded]);

  return (
    <div>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationRef} />
      </div>
      <div
        style={{
          minHeight: "375px",
          maxHeight: "540px",
          width: "100%",
        }}
      >
        <div className="shopHeader">
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            <h1 className="headerTitle">
              We hope you found product for your needs!
            </h1>
            <h4 className="headerTitle">Sugaring Shop a welocome your!</h4>
          </div>
        </div>
      </div>

      <Container className="mt--6 container" fluid>
        <Card style={{ paddingBottom: "70px" }}>
          <CardHeader className="border-0">
            <Row>
              <Col xs="6">
                <h3 className="mb-0">Your Cart</h3>
              </Col>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th>Product</th>
                <th>Qty / $</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productsFromCoockies !== undefined
                ? productsFromCoockies.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="table-user">
                          <img
                            alt="..."
                            className="avatar rounded-circle mr-3"
                            src={require("./../../../assets/images/shopHeader.jpg")}
                          />
                          <b>{product.title}</b>
                        </td>
                        <td>
                          <span className="text-muted">
                            {product.qty} / $
                            {Number(product.qty) * Number(product.price)}
                          </span>
                        </td>
                        <td>
                          <div
                            className="text-muted"
                            dangerouslySetInnerHTML={{
                              __html: product ? product.shortDescription : "",
                            }}
                          />
                        </td>
                        <td className="table-actions">
                          <a
                            className="table-action table-action-delete"
                            href="#pablo"
                            id="tooltip601065234"
                            onClick={(e) =>
                              handleDeleteFromCart(product.productid)
                            }
                          >
                            <i className="fas fa-trash" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip601065234"
                          >
                            Delete product
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    );
                  })
                : undefined}
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <Row>
              <Col md={{ size: 8 }}>
                <div ref={paypalRef} />
              </Col>
              <Col md={{ size: 4 }} style={{ display: "flex" }}>
                <div style={{ margin: "auto" }}>
                  <Table className="align-items-center table-flush" responsive>
                    <tbody>
                      <tr>
                        <td>
                          <b>Total</b>
                        </td>
                        <td>
                          <span className="text-muted">NZD {totalAmount}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Shiping</b>
                        </td>
                        <td>
                          <span className="text-muted">NZD 0</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Total to Pay</b>
                        </td>
                        <td>
                          <span className="text-muted">NZD {totalAmount}</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default Cart;
