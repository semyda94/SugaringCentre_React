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

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react'
import ProductCategoriesHeader from '../../../../components/Headers/ProductCategoriesHeader'
import { Container, Row, Col } from 'reactstrap'

import ServiceTable from './../../../../components/Tables/ServiceTable'
import ServiceDetails from './ServiceDetails'

import ServiceStore from './../../../../app/strore/serviceStores/serviceStore';

const ServiceList = () => {

    const serviceStore = useContext(ServiceStore)
    const {loadServices} = serviceStore;

    const [modify, setModify] = useState(false)
    const [selectedService, setselectedService] = useState(-1)

    useEffect(() => {
        loadServices();
    }, [loadServices])
    return (
        <>
            <>
                <ProductCategoriesHeader name="Service List" parentName="Service" action={() => {setModify(true)}} />

                <Container className="mt--6" fluid hidden={modify}>
                    <Row>
                        <Col>
                            <ServiceTable modifyHook={setModify} />
                        </Col>
                    </Row>
                </Container>

                <Container className="mt--6" fluid hidden={!modify}>
                    <Row>
                        <Col>
                            <ServiceDetails selectedService={selectedService} modifyHook={setModify} />
                        </Col>
                    </Row>
                </Container>
            </>
        </>
    )
}

export default observer(ServiceList)