/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/


import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Button,
    Col
} from "reactstrap";


//store
import ServiceStore from './../../app/strore/serviceStores/serviceStore';

interface IStaffTableProps {
    modifyHook: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceTable: React.FC<IStaffTableProps> = ({modifyHook}) => {

    const serviceStore = useContext(ServiceStore);
    const { serviceList, deleteService } = serviceStore;

    return (
        <Container fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Service table</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">Duration/Price</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {serviceList.map((service, idx) => (
                                    <tr key={idx}>
                                        <th scope="row">
                                            <Media className="align-items-center">
                                                <a
                                                    className="avatar rounded-circle mr-3"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <img
                                                        alt="..."
                                                        src={service.image}
                                                    />
                                                </a>
                                                <Media>
                                                    <span className="mb-0 text-sm">
                                                        {service.title}
                                                    </span>
                                                </Media>
                                            </Media>
                                        </th>
                                        <td>{service.desc}</td>
                                        <td>
                                            {service.duration + " min / $" + service.price}
                                        </td>
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        View Details
                                            </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={e => deleteService(idx)}
                                                    >
                                                        Delete
                                            </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <CardFooter className="py-4">
                            <Row>
                                <Col>
                                        <Button
                                            color="success"
                                            type="button"
                                            onClick={() => {modifyHook(true)}}>
                                            New Service
                                    </Button>
                                </Col>
                                <Col>

                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                //tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>

                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>

                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </div>
            </Row>
        </Container>
    )
}

export default observer(ServiceTable);
