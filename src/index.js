import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from './store';
import './index.css';
import App from './App';
import Vert from './Vert';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Vert/>,
  },
  {
    path:"whats-app",
    element: <App/>
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

