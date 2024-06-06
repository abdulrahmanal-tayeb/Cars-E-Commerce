import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { Suspense } from "react";
import Index from './components/Index';
import CarDetails from './components/CarDetails';
import { ToastContainer } from 'react-toastify';
import CarAdd from './components/CarAdd';
import CustomNavBar from './components/shared/CustomNavBar';

// import BasicExample from './components/shared/Navbar';

const App = () => {


    return (
        <Suspense fallback={<h1 children="Loading" />}>
            <CustomNavBar/>
            <Router>
                <Routes>
                    <Route index element={<Index/>} />
                    <Route path={"/car/"} element={<CarDetails/>} />
                    <Route path={"/car/add/"} element={<CarAdd/>} />
                </Routes>
            </Router>
            <div className="p-3" style={{textAlign: "center", marginTop: "5em", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p><strong>2024 CarsOnline By Abdulrahman M. Al-Tayeb - Github at @abdulrahmanal-tayeb</strong></p>
                <p>All images in this project are taken from <a href="http://www.pexels.com/">Pexels</a></p>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={true}
                theme="colored"
                style={{
                    zIndex: 999999999999999,
                }}
            />
        </Suspense>
    )
}
export default App;

