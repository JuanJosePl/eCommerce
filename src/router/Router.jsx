import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home"
import Error404 from "../components/pages/Error404";
import Products from "../components/pages/Products";
import App from "../components/template/App";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Form from "../components/pages/admin/products/Form";


const router = createBrowserRouter([
    { 
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            { 
                index: true,
                element: <Home />,
             },
            { 
                path: "/productos",
                element: <Products />,
             }
        ]
     },
     { 
        path: "/login",
        element: <Login />
     },
     { 
        path: "/register",
        element: <Register />
     },
     { 
      path: "/admin/productos/crear",
      element: <Form />
   }
])

export default router