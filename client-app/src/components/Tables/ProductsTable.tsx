import React, { useContext } from 'react'

//Store
import ProductStore from './../../app/strore/productStores/productStore'

// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
} from "reactstrap";
import { observer } from 'mobx-react-lite';

interface IProp {
    trigerEdit: (idx: number) => void
}

const ProductsTable: React.FC<IProp> = ({trigerEdit}) => {

    const productStore = useContext(ProductStore);
    const { productList, deleteProducts } = productStore

    return (
        <div>
            <Card>
                <CardHeader className="border-0">
                    <h3 className="mb-0">Products table</h3>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th className="sort" data-sort="budget" scope="col">Id</th>
                            <th className="sort" data-sort="name" scope="col">Title</th>
                            <th className="sort" data-sort="budget" scope="col">Price</th>
                            <th className="sort" data-sort="name" scope="col">Short Desc</th>
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody className="list">
                        {productList.map((product, idx) => (
                            <tr key={idx}>
                                <th scope="row">
                                    <span className="name mb-0 text-sm">
                                        {product.productId}
                                    </span>
                                </th>
                                <td className="title">{product.title}</td>
                                <td className="price">${product.price}</td>
                                <td className="shortDesc">{product.shortDescription}</td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            color=""
                                            role="button"
                                            size="sm"
                                        >
                                            <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                onClick={() => { trigerEdit(product.productId) }}
                                            >
                                                Edit
                                                    </DropdownItem>
                                            <DropdownItem
                                            onClick={() => { deleteProducts(idx) }}
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
                    <nav aria-label="...">
                        <Pagination
                            className="pagination justify-content-end mb-0"
                            listClassName="justify-content-end mb-0"
                        >
                            <PaginationItem className="disabled">
                                <PaginationLink
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                // tabIndex="-1"
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
                                    2 <span className="sr-only">(current)</span>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    3
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
                </CardFooter>
            </Card>
        </div>
    )
}

export default observer(ProductsTable)
