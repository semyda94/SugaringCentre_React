import {IFirstLayerRoute} from './../interfaces/IRouter'

//components
import Bookings from './../views/pages/booking/Bookings'
import Shop from './../views/pages/shop/Shop'
import Cart from './../views/pages/shop/Cart'

var mainRoutes : IFirstLayerRoute[] = [
    {
      collapse: true,
      path: "/bookings",
      name: "Bookings",
      miniName: "L",
      icon: "",
      component: Bookings,
      layout: "/",
      state: "",
      views: []
    },
    {
      collapse: true,
      path: "/shop",
      name: "Shop",
      miniName: "S",
      icon: "",
      component: Shop,
      layout: "/",
      state: "",
      views: []
    },
    {
      collapse: true,
        path: "/cart",
        name: "Cart",
        miniName: "C",
        icon: "",
        component: Cart,
        layout: "/",
        state: "",
        views: []
      },
  ];

  export default mainRoutes;