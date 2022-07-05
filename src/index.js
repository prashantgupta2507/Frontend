import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TemplateProvider from "./templates/TemplateProvider";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store} >
            <TemplateProvider >
                <App />
            </TemplateProvider>
        </Provider>
    </React.StrictMode>, document.getElementById('root'));