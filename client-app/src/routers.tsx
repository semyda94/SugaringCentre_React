import Index from './views/pages/index'

import { IFirstLayerRoute } from './interfaces/IRouter';

import mainRoutes from './routes/mainRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

var routes: IFirstLayerRoute[] = [
  {
    collapse: false,
    path: "/",
    name: "Index",
    miniName: "I",
    icon: "",
    component: Index,
    layout: "/",
    state: "",
    views: []
  },
  ...mainRoutes,
  // ...authRoutes,
  ...adminRoutes
];

export default routes;
