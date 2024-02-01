import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Helmet} from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Helmet>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        </Helmet>
        <App/>
    </React.StrictMode>
);

reportWebVitals();
