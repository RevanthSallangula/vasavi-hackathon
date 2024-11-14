// Portal.js
import React, { useState } from "react";
import "../styles/Login.css";

const farmersData = [
    {
        name: "Farmer A",
        crop: "Wheat",
        acres: 10,
        request: "Need advice on pest control",
    },
    {
        name: "Farmer B",
        crop: "Rice",
        acres: 15,
        request: "Requesting water supply update",
    },
    {
        name: "Farmer C",
        crop: "Corn",
        acres: 8,
        request: "Need information on crop rotation",
    },
];

function Login() {
    const [userType, setUserType] = useState("");
    const [farmers, setFarmers] = useState(farmersData);
    const [farmerList, setFarmerList] = useState([]);
    const [farmerName, setFarmerName] = useState("");
    const [cropType, setCropType] = useState("");
    const [landAcres, setLandAcres] = useState("");

    const handleAddFarmer = () => {
        if (farmerName && cropType && landAcres) {
            const newFarmer = {
                name: farmerName,
                crop: cropType,
                acres: landAcres,
            };
            setFarmerList([...farmerList, newFarmer]);
            setFarmerName("");
            setCropType("");
            setLandAcres("");
        } else {
            alert("Please fill out all fields to add a farmer.");
        }
    };

    const respondToRequest = (index) => {
        alert(
            `Responded to ${farmers[index].name}'s request: "${farmers[index].request}"`
        );
    };

    return (
        <div className="container">
            <h2>Login as:</h2>
            <button className="btn" onClick={() => setUserType("govt")}>
                Government Employee
            </button>
            <button className="btn" onClick={() => setUserType("private")}>
                Private Employee
            </button>

            {userType === "govt" && (
                <div className="section">
                    <h3>Government Employee Portal</h3>
                    <h4>Add Farmer Details</h4>
                    <div className="input-group">
                        <label htmlFor="farmerName">Farmer Name:</label>
                        <input
                            type="text"
                            id="farmerName"
                            value={farmerName}
                            placeholder="Enter Farmer Name"
                            onChange={(e) => setFarmerName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cropType">Crop Type:</label>
                        <input
                            type="text"
                            id="cropType"
                            value={cropType}
                            placeholder="Enter Crop Type"
                            onChange={(e) => setCropType(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="landAcres">Acres of Land:</label>
                        <input
                            type="text"
                            id="landAcres"
                            value={landAcres}
                            placeholder="Enter Acres of Land"
                            onChange={(e) => setLandAcres(e.target.value)}
                        />
                    </div>
                    <button className="btn" onClick={handleAddFarmer}>
                        Add Farmer
                    </button>

                    <div id="farmerList" style={{ marginTop: "15px" }}>
                        {farmerList.map((farmer, index) => (
                            <p key={index}>
                                <strong>{farmer.name}</strong> - {farmer.crop},{" "}
                                {farmer.acres} acres
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {userType === "private" && (
                <div className="section">
                    <h3>Private Employee Portal</h3>
                    <div id="assignedFarmers">
                        <h4>Assigned Farmers</h4>
                        <div id="farmerRequests">
                            {farmers.map((farmer, index) => (
                                <div key={index} className="farmer-card">
                                    <p>
                                        <strong>Farmer Name:</strong>{" "}
                                        {farmer.name}
                                    </p>
                                    <p>
                                        <strong>Crop Type:</strong>{" "}
                                        {farmer.crop}
                                    </p>
                                    <p>
                                        <strong>Land Acres:</strong>{" "}
                                        {farmer.acres}
                                    </p>
                                    <p>
                                        <strong>Request:</strong>{" "}
                                        {farmer.request}
                                    </p>
                                    <button
                                        className="btn"
                                        onClick={() => respondToRequest(index)}
                                    >
                                        Respond
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
