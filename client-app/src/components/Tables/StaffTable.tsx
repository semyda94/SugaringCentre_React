import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
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
import StaffStore from './../../app/strore/staffStore';

interface IStaffTableProps {
    modifyHook: React.Dispatch<React.SetStateAction<boolean>>
}

const StaffTable: React.FC<IStaffTableProps> = ({modifyHook}) => {

    const staffStore = useContext(StaffStore);
    const { staffList, loadStaff, deleteStaff } = staffStore;

    useEffect(() => {
        loadStaff();
    }, [loadStaff])

    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Staff table</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Employee</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map((staff, idx) => (
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
                                                        // src={require("./../../images/logo.jpg")}
                                                    />
                                                </a>
                                                <Media>
                                                    <span className="mb-0 text-sm">
                                                        {staff.firstName + ' ' + staff.lastName}
                                                    </span>
                                                </Media>
                                            </Media>
                                        </th>
                                        <td>{staff.title}</td>
                                        <td>
                                            <Badge color="" className="badge-dot mr-4">
                                                <i className="bg-warning" />
                                         pending
                                    </Badge>
                                        </td>
                                        <td>
                                            UserName
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
                                                        onClick={e => deleteStaff(idx)}
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
                                            New Staff
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

export default observer(StaffTable);
