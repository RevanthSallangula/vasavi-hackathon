import React, { useState } from "react";

const RequestFarmerForm = ({ onSubmit }) => {
    const [cropType, setCropType] = useState("");
    const [landArea, setLandArea] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cropType && landArea) {
            onSubmit({ cropType, landArea });
        } else {
            alert("Both fields are required.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="request-farmer-form">
            <div>
                <label>Farmer Crop Type:</label>
                <input
                    type="text"
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                />
            </div>
            <div>
                <label>Farmer Land Area:</label>
                <input
                    type="text"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                />
            </div>
            <button type="submit">Submit Request</button>
        </form>
    );
};

export default RequestFarmerForm;
