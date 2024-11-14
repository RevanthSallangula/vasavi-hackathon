import React, { useState } from "react";
import "../styles/PrivateView.css";
import SidebarComponent from "../components/SidebarComponent";

function PrivateView() {
    return (
        <div>
            <div className="sidebar">
                <SidebarComponent />
            </div>
            <div className="private-view-content"></div>
        </div>
    );
}

export default PrivateView;
