// PrivateDashboard.jsx
import React, { useState } from "react";
import "../styles/PrivateDashboard.css";
import SidebarComponent from "../components/SidebarComponent";
import HandleGetIssues from "../api/HandleGetIssues";

function PrivateDashboard() {
    const [selectedView, setSelectedView] = useState("Open Issues");

    const handleSidebarClick = (view) => {
        setSelectedView(view);
    };

    return (
        <div className="private-dashboard-home">
            <div className="sidebar">
                <SidebarComponent onClick={handleSidebarClick} />
            </div>

            <div className="private-view-content">
                {selectedView === "Open Issues" && <HandleGetIssues />}
                {selectedView === "Issues in Progress" && <HandleGetIssues />}
                {selectedView === "Completed Issues" && <HandleGetIssues />}
            </div>
        </div>
    );
}

export default PrivateDashboard;
