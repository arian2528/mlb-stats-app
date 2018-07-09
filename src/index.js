import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-daterangepicker/daterangepicker.css';
import './App.css';
// import App from './App';
import ReduxApp from "./ReduxApp";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ReduxApp />, document.getElementById('root'));
registerServiceWorker();
