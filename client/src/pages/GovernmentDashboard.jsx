import React, { useState } from "react";
import "../styles/GovernmentDashboard.css";
import SidebarGovernment from "../components/SidebarGovernment";

function GovernmentDashboard() {
    const [farmerData, setFarmerData] = useState({
        farmerName: "",
        farmerID: "",
        farmerAge: "",
        farmerLocation: "",
        farmerFieldArea: "",
        farmerCropType: "",
        farmerClient: "",
    });

    const [currentView, setCurrentView] = useState("addFarmer"); // Default view is "Add Farmer"

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFarmerData({
            ...farmerData,
            [name]: value,
        });
    };

    // Add farmer data via POST request
    const addFarmer = () => {
        if (
            !farmerData.farmerName ||
            !farmerData.farmerID ||
            !farmerData.farmerAge ||
            !farmerData.farmerLocation ||
            !farmerData.farmerFieldArea ||
            !farmerData.farmerCropType ||
            !farmerData.farmerClient
        ) {
            alert("All fields are required.");
            return;
        }

        fetch("http://localhost:3000/addFarmer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(farmerData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Farmer added successfully.") {
                    alert(data.message);
                    setFarmerData({
                        farmerName: "",
                        farmerID: "",
                        farmerAge: "",
                        farmerLocation: "",
                        farmerFieldArea: "",
                        farmerCropType: "",
                        farmerClient: "",
                    });
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error adding farmer:", error);
                alert("Failed to add farmer.");
            });
    };

    // Handle Sidebar Click (Switch Views)
    const handleSidebarClick = (view) => {
        setCurrentView(view);
    };

    return (
        <div className="government-dashboard-home">
            <div className="sidebar-div">
                <SidebarGovernment onClick={handleSidebarClick} />
            </div>
            <div className="government-view-content">
                {currentView === "addFarmer" && (
                    <div>
                        <h2>Government Dashboard</h2>
                        <h4>Add Farmer Details</h4>
                        <input
                            type="text"
                            name="farmerID"
                            value={farmerData.farmerID}
                            placeholder="Farmer ID"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="farmerName"
                            value={farmerData.farmerName}
                            placeholder="Farmer Name"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="farmerAge"
                            value={farmerData.farmerAge}
                            placeholder="Farmer Age"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="farmerLocation"
                            value={farmerData.farmerLocation}
                            placeholder="Farmer Location"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="farmerFieldArea"
                            value={farmerData.farmerFieldArea}
                            placeholder="Farmer Field Area"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="farmerCropType"
                            value={farmerData.farmerCropType}
                            placeholder="Farmer Crop Type"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="farmerClient"
                            value={farmerData.farmerClient}
                            placeholder="Farmer Client"
                            onChange={handleChange}
                        />
                        <button className="btn" onClick={addFarmer}>
                            Add Farmer
                        </button>
                    </div>
                )}
                {currentView === "approveFarmers" && <div></div>}{" "}
                {/* Empty div for approve farmers */}
                {/* You can add more views here as per your requirement */}
            </div>
        </div>
    );
}

export default GovernmentDashboard;
