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

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";

// plugins styles downloaded
import "./assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "./assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "./assets/vendor/select2/dist/css/select2.min.css";
import "./assets/vendor/quill/dist/quill.core.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";

// core styles
import "./assets/scss/argon-dashboard-pro-react.scss";
import './index.css'
// Layouts
import AdminConsole from './layouts/AdminConsole';
// import Authentication from './layouts/Authentication';
import Main from './layouts/Main';

export const history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/auth" component={Authentication} /> */}
        <Route path="/admin"  render={props => <AdminConsole />}/>
        <Route path="/" component={Main} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
