import { IFirstLayerRoute } from './../interfaces/IRouter'

//components
import Index from './../views/pages/adminConsole/Index'

import Product from './../views/pages/adminConsole/Product/Product'
import ProductList from './../views/pages/adminConsole/Product/ProductList'
import Categories from './../views/pages/adminConsole/Product/Categories'

import Service from './../views/pages/adminConsole/Services/Service'
import ServiceList from './../views/pages/adminConsole/Services/ServiceList'
import ServiceCategories from './../views/pages/adminConsole/Services/ServiceCategories'

import StaffDashboard from './../views/pages/adminConsole/Staff/StaffDashboard';
import Details from './../views/pages/adminConsole/Staff/Details';

import Booking from './../views/pages/adminConsole/Bookings/Booking'


var adminRoutes: IFirstLayerRoute[] = [
  {
    collapse: false,
    path: "/index",
    name: "Dashboard",
    miniName: "D",
    icon: "ni ni-chart-pie-35 text-primary",
    component: Index,
    layout: "/admin",
    state: "",
    views: []
  },
  {
    collapse: true,
    path: "/product",
    name: "Products",
    miniName: "P",
    icon: "ni ni-shop text-danger",
    component: Product,
    layout: "/admin",
    state: "productsCollapse",
    views: [
      {
        collapse: false,
        layout: "/admin",
        path: "/products/categories",
        name: "Categories",
        miniName: "C",
        component: Categories,
        state: ""
      },
      {
        collapse: false,
        layout: "/admin",
        path: "/products",
        name: "Product List",
        miniName: "P",
        component: ProductList,
        state: ""
      }]
  },
  {
    collapse: true,
    path: "/service",
    name: "Services",
    miniName: "S",
    icon: "ni ni-palette text-success",
    component: Service,
    layout: "/admin",
    state: "servicesCollapse",
    views: [
      {
        collapse: false,
        layout: "/admin",
        path: "/services/categories",
        name: "Categories",
        miniName: "C",
        component: ServiceCategories,
        state: ""
      },
      {
        collapse: false,
        layout: "/admin",
        path: "/services",
        name: "Services List",
        miniName: "S",
        component: ServiceList,
        state: ""
      }]
  },
  {
    collapse: false,
    path: "/staff",
    name: "Staff",
    miniName: "S",
    icon: "ni ni-badge text-warning",
    component: StaffDashboard,
    layout: "/admin",
    state: "staffCollapse",
    views: []
  },
  {
    collapse: false,
    path: "/bookings",
    name: "Bookings",
    miniName: "B",
    icon: "ni ni-watch-time text-info",
    component: Booking,
    layout: "/admin",
    state: "bookingCollapse",
    views: []
  }
];

export default adminRoutes