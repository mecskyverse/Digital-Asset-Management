import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from './Footer'
export default function Layout() {
    return (
        <>
            <div className="site-wrapper">
                <div className="z-100 "> < Navbar /></div>
                <Outlet />

            </div>
        </>
    )

}