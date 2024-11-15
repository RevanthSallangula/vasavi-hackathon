import React, { useState, useEffect } from "react";
import "../styles/PrivateDashboard.css";
import SidebarPrivate from "../components/SidebarPrivate";

const HandleViewContent = ({ view, issues, farmers }) => {
    if (view === "farmers") {
        if (!farmers || farmers.length === 0) {
            return <p>No farmers found.</p>;
        }

        return (
            <div className="farmers-container">
                <h4>Your Farmers</h4>
                <ul>
                    {farmers.map((farmer, index) => (
                        <li key={index}>
                            <div className="farmer-item">
                                <h2>Farmer Details</h2>
                                <div className="data">
                                    <strong>Farmer ID:</strong>{" "}
                                    {farmer.farmerID}
                                </div>
                                <div className="data">
                                    <strong>Farmer Name:</strong>{" "}
                                    {farmer.farmerName}
                                </div>
                                <div className="data">
                                    <strong>Age:</strong> {farmer.farmerAge}
                                </div>
                                <div className="data">
                                    <strong>Location:</strong>{" "}
                                    {farmer.farmerLocation}
                                </div>
                                <div className="data">
                                    <strong>Field Area:</strong>{" "}
                                    {farmer.farmerFieldArea}
                                </div>
                                <div className="data">
                                    <strong>Crop Type:</strong>{" "}
                                    {farmer.farmerCropType}
                                </div>
                                <div className="data">
                                    <strong>Client:</strong>{" "}
                                    {farmer.farmerClient}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        const filteredIssues = issues[view] || []; // view will be 'open', 'inProgress', or 'completed'

        return (
            <div className="issues-container">
                <h4>
                    {view === "open"
                        ? "Open Issues"
                        : view === "inProgress"
                        ? "Issues in Progress"
                        : "Completed Issues"}
                </h4>
                {filteredIssues.length === 0 ? (
                    <p>
                        No{" "}
                        {view === "open"
                            ? "open"
                            : view === "inProgress"
                            ? "issues in progress"
                            : "completed"}{" "}
                        issues found.
                    </p>
                ) : (
                    <ul>
                        {filteredIssues.map((issue, index) => (
                            <li key={index}>
                                <div className="issue-item">
                                    <h2>Issue Tracker</h2>
                                    <div className="data">
                                        <strong>Issue ID:</strong>{" "}
                                        {issue.issueID}
                                    </div>
                                    <div className="data">
                                        <strong>Issue Name:</strong>{" "}
                                        {issue.issueName}
                                    </div>
                                    <div className="data">
                                        <strong>Farmer ID:</strong>{" "}
                                        {issue.farmerID}
                                    </div>
                                    <div className="data">
                                        <strong>Farmer Name:</strong>{" "}
                                        {issue.farmerName}
                                    </div>
                                    <div className="data">
                                        <strong>Status:</strong> {issue.status}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
};

function PrivateDashboard() {
    const [selectedView, setSelectedView] = useState("open"); // default view is 'open'
    const [issues, setIssues] = useState({
        open: [],
        inProgress: [],
        completed: [],
    });
    const [farmers, setFarmers] = useState([]);

    // Fetch issues
    useEffect(() => {
        fetch("http://localhost:3000/getIssues")
            .then((response) => response.json())
            .then((data) => {
                // Categorize issues based on status
                console.log(data);

                const categorizedIssues = {
                    open: [],
                    inProgress: [],
                    completed: [],
                };

                data.forEach((issue) => {
                    if (issue.status === "open") {
                        categorizedIssues.open.push(issue);
                    } else if (issue.status === "taken") {
                        categorizedIssues.inProgress.push(issue);
                    } else if (issue.status === "finished") {
                        categorizedIssues.completed.push(issue);
                    }
                });

                setIssues(categorizedIssues);
                console.log(categorizedIssues, issues);
            })
            .catch((error) => console.error("Error fetching issues:", error));
    }, []);

    // Fetch farmers when the "Your Farmers" view is selected
    useEffect(() => {
        fetch("http://localhost:3000/getFarmers")
            .then((response) => response.json())
            .then((data) => {
                setFarmers(data);
                console.log("Farmers", farmers);
            })
            .catch((error) => console.error("Error fetching farmers:", error));
    }, [selectedView]);

    const handleSidebarClick = (view) => {
        setSelectedView(view);
    };

    return (
        <div className="private-dashboard-home">
            <div className="sidebar">
                <SidebarPrivate onClick={handleSidebarClick} />
            </div>

            <div className="private-view-content">
                <HandleViewContent
                    view={selectedView}
                    issues={issues}
                    farmers={farmers}
                />
            </div>
        </div>
    );
}

export default PrivateDashboard;
