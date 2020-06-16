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

import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import CategoryStore from './../../../../app/strore/productStores/categoryStore'

import ProductCategoriesHeader from './../../../../components/Headers/ProductCategoriesHeader'


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Col,
    CardBody,
    Form,
    Input,
} from "reactstrap";

import { ICategory } from '../../../../app/models/products/category';

const Categories = () => {

    const categoryStore = useContext(CategoryStore)
    const { categoryList, loadCategory, deleteCategory, createCategory, editCategory } = categoryStore

    const [modifyMode, setModifyMode] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [inputField, setinputField] = useState({ categoryname: "", categorynameState: "invalid" })

    useEffect(() => {
        loadCategory()
    }, [loadCategory, deleteCategory])

    const handleNewCategoryButton = () => {
        if (!modifyMode) {
            setModifyMode(!modifyMode);
        }
        
        setinputField({ categoryname: "", categorynameState: "invalid" });
        setSelectedCategory(0);
    }

    const customStylesForm = (e: React.ChangeEvent<HTMLInputElement>, stateName: string) => {
        console.log(stateName + "   |   " + e.target.value);
        console.log(inputField.categoryname + "  |  " + inputField.categorynameState)
        let newState = inputField;
        switch (stateName) {
            case "categoryname":
                newState.categoryname = e.target.value;
                newState.categorynameState = e.target.value === "" ? "invalid" : "valid"
                break;

            default:
                break;
        }

        setinputField(newState)

        console.log(stateName + "   |   " + e.target.value);
        console.log(inputField.categoryname + "  |  " + inputField.categorynameState)
    };

    const validateCustomStylesForm = () => {
        let newState = inputField;

        if (newState.categoryname === "") {
            newState.categorynameState = "invalid";
        } else {
            newState.categorynameState = "valid";
        }

        setinputField(newState)
    };

    const handleCreateNewCategory = () => {
        if (inputField.categorynameState === 'valid') {
            const category: ICategory =
            {
                categoryId: 0,
                name: inputField.categoryname
            }


            if (selectedCategory > 0) {
                editCategory(category);
            } else {
                createCategory(category);
            }

            setModifyMode(false);
        }
    }

    const handleEditCategory = (idx: number) => {
        if (!modifyMode) {
            setModifyMode(true);
        }
        
        let newState = inputField;

        newState.categoryname = categoryList[idx].name;
        if (newState.categoryname === "") {
            newState.categorynameState = "invalid";
        } else {
            newState.categorynameState = "valid";
        }

        setinputField(newState);
        setSelectedCategory(idx);
    }

    return (
        <>
            <ProductCategoriesHeader name="Categories" parentName="Products"  action={handleNewCategoryButton} />

            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card>
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Categories table</h3>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th className="sort" data-sort="name" scope="col">
                                            Id
                                        </th>
                                        <th className="sort" data-sort="budget" scope="col">
                                            Name
                                        </th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    {categoryList.map((category, idx) => (
                                        <tr key={idx}>
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <Media>
                                                        <span className="name mb-0 text-sm">
                                                            {category.categoryId}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                            <td className="budget">{category.name}</td>
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
                                                            href="#pablo"
                                                            onClick={() => {handleEditCategory(idx)}}
                                                        >
                                                            Edit
                                                    </DropdownItem>
                                                        <DropdownItem
                                                            href="#pablo"
                                                            onClick={() => { deleteCategory(idx) }}
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
                    {modifyMode === true ?
                        <div className="col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                        <h3 className="mb-0">New Category</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col lg="8">
                                                <p className="mb-0">
                                                    Enter the category name
                        </p>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Form className="needs-validation" noValidate onSubmit={handleCreateNewCategory}>
                                            <div className="form-row">
                                                <Col className="mb-3" md="12">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationCustom01"
                                                    >
                                                        Category Name
                          </label>
                                                    <Input
                                                        value={inputField.categoryname}
                                                        id="validationCustom01"
                                                        placeholder="Category Name"
                                                        type="text"
                                                        valid={
                                                            inputField.categorynameState === "valid"
                                                        }
                                                        invalid={
                                                            inputField.categorynameState ===
                                                            "invalid"
                                                        }
                                                        onChange={e =>
                                                            customStylesForm(e, "categoryname")
                                                        }
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                </Col>
                                            </div>
                                            <Button
                                                color="success"
                                                type="submit"
                                                onClick={validateCustomStylesForm}
                                            >
                                                Create Category
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        :
                        <>
                        </>
                    }
                </Row>
            </Container>
        </>
    )
}

export default observer(Categories)
