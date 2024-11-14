import React, { useState } from "react";
import "../styles/GovernmentDashboard.css";
import SidebarGovernment from "../components/SidebarGovernment";

function PrivateDashboard() {
    const [farmerData, setFarmerData] = useState({
        farmerName: "",
        farmerID: "",
        farmerAge: "",
        farmerLocation: "",
        farmerFieldArea: "",
        FarmerCropType: "",
    });

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
        // Check if all fields are filled
        if (
            !farmerData.farmerName ||
            !farmerData.farmerID ||
            !farmerData.farmerAge ||
            !farmerData.farmerLocation ||
            !farmerData.farmerFieldArea ||
            !farmerData.FarmerCropType
        ) {
            alert("All fields are required.");
            return;
        }

        // Make the POST request to localhost:3000/addFarmer
        fetch("http://localhost:3000/addFarmer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(farmerData),
        })
            .then((response) => response.json()) // Parse JSON response
            .then((data) => {
                if (data.message === "Farmer added successfully.") {
                    alert(data.message); // Success message from backend
                    // Reset form after successful addition
                    setFarmerData({
                        farmerName: "",
                        farmerID: "",
                        farmerAge: "",
                        farmerLocation: "",
                        farmerFieldArea: "",
                        FarmerCropType: "",
                    });
                } else {
                    alert(data.message); // Error message from backend
                }
            })
            .catch((error) => {
                console.error("Error adding farmer:", error);
                alert("Failed to add farmer.");
            });
    };

    return (
        <div className="government-dashboard-home">
            <div className="sidebar">
                <SidebarGovernment />
            </div>
            <div className="government-view-content">
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
                    name="FarmerCropType"
                    value={farmerData.FarmerCropType}
                    placeholder="Farmer Crop Type"
                    onChange={handleChange}
                />
                <button className="btn" onClick={addFarmer}>
                    Add Farmer
                </button>
            </div>
        </div>
    );
}

export default PrivateDashboard;
