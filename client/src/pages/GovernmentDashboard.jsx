import React, { useState, useEffect } from "react";
import "../styles/GovernmentDashboard.css";
import SidebarGovernment from "../components/SidebarGovernment";

function PrivateDashboard() {
    return (
        <div className="government-dashboard-home">
            <div className="sidebar">
                <SidebarGovernment />
            </div>
            <div className="government-view-content"></div>
        </div>
    );
}

export default PrivateDashboard;
