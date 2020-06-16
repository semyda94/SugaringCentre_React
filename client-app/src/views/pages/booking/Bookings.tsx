import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';

//Style Sheet
import './../../../assets/css/slidemenu.css';

//Stores
import ServiceCategoryStore from './../../../app/strore/serviceStores/serviceCategoryStore';
import ServiceStore from './../../../app/strore/serviceStores/serviceStore';
import { Link } from 'react-router-dom';



const Bookings = () => {
    const serviceCategoryStore = useContext(ServiceCategoryStore);
    const serviceStore = useContext(ServiceStore);

    const { loadServiceCategory, serviceCategoryList } = serviceCategoryStore;
    const { loadServices, serviceList } = serviceStore;

    const [selectedCategory, setselectedCategory] = useState(0)

    useEffect(() => {
        loadServiceCategory();
        loadServices();

    }, [loadServiceCategory, loadServices])


    const handleChangeCategoryFor = (idx: number) => {
        const margin = ((100 / serviceCategoryList.length) * idx).toString() + '%';

        var bar = document.getElementsByClassName("bar") as HTMLCollectionOf<HTMLElement>;

        bar[0].style.marginLeft = margin;

        setselectedCategory(idx);
    }

    return (
        <>
            <div className="slidemenu" style={{ maxWidth: (serviceCategoryList.length * 150).toString + "px" }}>

                {serviceCategoryList.map((category, idx) => {
                    if (idx === 0) {
                        return (
                            <div key={idx}>
                                <input type="radio" name="slideItem" id={"slide-item-" + idx.toString()} className="slide-toggle" checked onClick={e => handleChangeCategoryFor(idx)} onChange={e => () => { }} />
                                <label htmlFor={"slide-item-" + idx.toString()} style={{ width: (100 / serviceCategoryList.length).toString() + '%' }}>
                                    <span>{category.title}</span>
                                </label>
                            </div>
                        );
                    } else {
                        return (
                            <div key={idx}>
                                <input type="radio" name="slideItem" id={"slide-item-" + idx.toString()} className="slide-toggle" onClick={e => handleChangeCategoryFor(idx)} onChange={e => () => { }} />
                                <label htmlFor={"slide-item-" + idx.toString()} style={{ width: (100 / serviceCategoryList.length).toString() + '%' }}>
                                    <span>{category.title}</span>
                                </label>
                            </div>
                        );
                    }

                })}

                <div className="clear"></div>

                {/* Bar  */}
                <div className="slider">
                    <div className="bar" style={{ width: (100 / serviceCategoryList.length).toString() + '%' }}></div>
                </div>
            </div>

            <section className="typeList">
                {serviceList.map((service, idx) => {
                    return (
                        <div className="container-fluid" key={idx} hidden={service.serviceCategoryId !== serviceCategoryList[selectedCategory].serviceCategoryId}>
                            <div className="row serviceCategory-@service.ServiceCategoryId" >

                                <div className="col-xs-12 col-sm" style={{ display: "flex" }}>
                                    <Link to={`/bookings/details/${service.serviceId}`}>
                                        <div className="imageLink">
                                            <div className="circleThumbnail" style={{ backgroundImage: service.image }}>
                                                <img className="circleThumbnail" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} src={service.image} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <span className="serviceDivider">
                                </span>
                                <div className="col-xs-12 col-sm" style={{ textAlign: "center", display: "inline-grid" }}>
                                    <div style={{ marginTop: "auto", marginBottom: "auto", height: "auto" }}>
                                        <div className="typeTitle">
                                            <Link to={`/bookings/details/${service.serviceId}`}>
                                                <div >{service.title}</div>
                                            </Link>
                                        </div>
                                        <div className="priceAndDuration">${service.price} | {service.duration} Min</div>
                                        <Link to={`/bookings/bookservice/${service.serviceId}`}>
                                            <div className="bookItButton">Book It</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div >
                    );
                })}
            </section >

        </>
    )
}

export default observer(Bookings)

