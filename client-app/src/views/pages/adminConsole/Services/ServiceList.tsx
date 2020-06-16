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