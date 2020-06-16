import React, { useEffect, useContext, useState } from 'react'

//Core components
import ProductCategoriesHeader from '../../../../components/Headers/ProductCategoriesHeader'
import ProductsTable from '../../../../components/Tables/ProductsTable'
import ProductDetails from '../../../../components/feature/products/ProductDetails'

//store
import ProductStore from './../../../../app/strore/productStores/productStore'
import CategoryStore from './../../../../app/strore/productStores/categoryStore'

// reactstrap components
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import { observer } from 'mobx-react-lite'

const ProductList = () => {

    const productStore = useContext(ProductStore)
    const { loadProducts } = productStore

    const categoryStore = useContext(CategoryStore)
    const { loadCategory } = categoryStore

    const [modify, setModify] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(0);

    const handleNewProduct = () => {
        setModify(true);
        setSelectedProduct(-1)
    }

    const handleModifyProduct = (idx: number) => {
        setModify(true);
        setSelectedProduct(idx);
    }


    useEffect(() => {
        loadProducts();
        loadCategory();

    }, [loadProducts, loadCategory])



    return (
        <>
            <ProductCategoriesHeader name="Product List" parentName="Products" action={handleNewProduct} />

            <Container className="mt--6" fluid hidden={modify}>
                <Row>
                    <Col>
                        <ProductsTable trigerEdit={handleModifyProduct}/>
                    </Col>
                </Row>
            </Container>

            <Container className="mt--6" fluid hidden={!modify}>
                <Row>
                    <Col>
                        <ProductDetails selectedProduct={selectedProduct} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default observer(ProductList)
