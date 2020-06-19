import axios, { AxiosResponse } from 'axios';
import { history } from '../../';

//models
import { IStaff } from './../models/staff/staff'
// peoduct models
import { ICategory } from './../models/products/category'
import { IProduct } from './../models/products/product'
import { IProductImage } from '../models/products/productImage';
import { IProductStat } from '../models/products/productStat';
import {IOrder} from '../models/orders/Order'
import { IService } from '../models/services/service'
import { IServiceCategory } from '../models/services/serviceCategory';
import { IBooking } from '../models/Booking'

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
const {status, data, config} = error.response;

    if (error.message ==='Network Error' && !error.response) {
        // toast.error('API server down');
    }

    if (status === 404) {
        history.push('/notfound');
    }

    if (status === 400 && config.method === 'get') {
        history.push('/notfound');
    }

    if (status === 500) {
        // toast.error('Server error - check the terminal for more info!');
    }

    throw error;

    console.log(error.response);
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const request = {
    get: (url: string) => axios.get(url).then(sleep(1)).then(responseBody),
    post:(url: string, body: {}) => axios.post(url, body).then(sleep(1)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1)).then(responseBody)
}

const Staff = {
    list: () : Promise<IStaff[]> => request.get('/staff'),
    detatil: (id: number) => request.get(`/staff/${id}`),
    workingDays: (id: number) : Promise<number[]> => request.get(`/staff/workingdays/${id}`),
    timeOptions: (staffId: number, serviceId: number, date: Date) : Promise<{value: Date, label: string}[]> => request.get(`/staff/timeoptions/${staffId}/${serviceId}/${date.toDateString()}`),
    create: (staff: IStaff) => request.post(`/staff`, staff),
    update: (staff: IStaff) => request.put(`/staff/${staff.staffId}`, staff),
    delete: (id: number) => request.delete(`/staff/${id}`)
}

const Category = {
    list: () : Promise<ICategory[]> => request.get('/category'),
    create: (category: ICategory) => request.post(`/category`, category),
    update: (category: ICategory) => request.put(`/category/${category.categoryId}`, category),
    delete: (id: number) => request.delete(`/category/${id}`)
}

const Product = {
    list: () : Promise<IProduct[]> => request.get('/product'),
    create: (product: IProduct) => request.post(`/product`, product),
    update: (product: IProduct) => request.put(`/product/${product.productId}`, product),
    delete: (id: number) => request.delete(`/product/${id}`),
    stat: (id: number) : Promise<IProductStat> => request.get(`/product/stat/${id}`)
}

const Shop = {
    list: (page: number, pageSize: number, minPrice: number, maxPrice: number, selectedCategories: string) : Promise<IProduct[]> => request.get(`/shop/${page}/${pageSize}/${minPrice}/${maxPrice}/${selectedCategories}`),
    productDetails: (id: number) : Promise<IProduct> => request.get(`/shop/details/${id}`),
    image: (id: number) : Promise<IProductImage> => request.get(`/shop/imageFor/${id}`)
}

const Order = {
    list: (): Promise<IOrder[]> => request.get('/order'),
    create: (order: IOrder) => request.post('/order', order)
}

const Service = {
    list: (): Promise<IService[]> => request.get('/service'),
    options: (): Promise<{value: number, label: string}[]> => request.get('/service/options'),
    details: (id: number) : Promise<IService> => request.get(`/service/${id}`),
    masters: (id: number) : Promise<IStaff[]> => request.get(`/service/masters/${id}`),
    create: (service: IService) => request.post('/service', service),
    delete: (id: number) => request.delete(`/service/${id}`)
}

const ServiceCategory = {
    list: (): Promise<IServiceCategory[]> => request.get('/servicecategory'),
    create: (category: IServiceCategory) => request.post('/servicecategory',category),
    delete: (id: number) => request.delete(`/servicecategory/${id}`)
}

const Booking = {
    create: (booking: IBooking) => request.post('/bookings', booking)
}

export default  { Staff, Category, Product, Shop, Order, Service, ServiceCategory, Booking }

