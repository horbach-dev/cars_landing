import React, {useEffect} from "react";
import { RouterProvider, createBrowserRouter} from "react-router-dom";

import './App.scss';
import Home from "./Home";

import {createBrowserHistory} from 'history'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    }
])

function App() {

    useEffect(() => {
        window.setAdmin = () => {
            localStorage.setItem('admin_token', 'tokenizer')
        }
    }, [])

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
