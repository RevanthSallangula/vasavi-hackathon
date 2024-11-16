import React, { useState, useEffect } from "react";
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

    const [farmerRequests, setFarmerRequests] = useState([]); // State to hold farmer requests
    const [currentView, setCurrentView] = useState("addFarmer"); // Default view is "Add Farmer"

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFarmerData({
            ...farmerData,
            [name]: value,
        });
    };

    // Fetch farmer requests from the database
    useEffect(() => {
        if (currentView === "approveFarmers") {
            fetch("http://localhost:3000/getFarmerRequests")
                .then((response) => response.json())
                .then((data) => setFarmerRequests(data))
                .catch((error) =>
                    console.error("Error fetching requests:", error)
                );
        }
    }, [currentView]);

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

    // Approve farmer request
    // Approve farmer request with crop type and field area
    const approveRequest = (requestID) => {
        const request = farmerRequests.find((req) => req.id === requestID);
        const { cropType, landArea } = request;

        fetch("http://localhost:3000/approveFarmers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                farmerCropType: cropType,
                farmerFieldArea: landArea,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Farmers approved successfully.") {
                    alert(data.message);
                    setFarmerRequests(
                        farmerRequests.filter((req) => req.id !== requestID)
                    );
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error approving request:", error);
                alert("Failed to approve request.");
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
                {currentView === "approveFarmers" && (
                    <div>
                        <h2>Approve Farmer Requests</h2>
                        {farmerRequests.length > 0 ? (
                            <ul>
                                {farmerRequests.map((request) => (
                                    <div className="request-approve-div">
                                        <li key={request.id}>
                                            <p>Crop Type: {request.cropType}</p>
                                            <p>Land Area: {request.landArea}</p>
                                            <button
                                                onClick={() =>
                                                    approveRequest(request.id)
                                                }
                                            >
                                                Approve
                                            </button>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>No pending requests to approve.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GovernmentDashboard;
