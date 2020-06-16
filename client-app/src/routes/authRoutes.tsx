import Login from './../views/pages/auth/Login';

var authRoutes = [
    {
      collapse: true,
      path: "/login",
      name: "Login",
      miniName: "L",
      icon: "",
      component: Login,
      layout: "/auth",
      hidden: true,
      views: null
    }
  ];

  export default authRoutes;