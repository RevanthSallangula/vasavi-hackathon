import React, { useState, useEffect } from "react";
import "../styles/PrivateDashboard.css";
import SidebarPrivate from "../components/SidebarPrivate";
import RequestFarmerForm from "../components/RequestFarmerForm";

const handleFarmerRequestSubmit = (data) => {
    fetch("http://localhost:3000/addFarmerRequest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("Request submitted:", result.message);
            alert("Farmer request submitted successfully.");
        })
        .catch((error) =>
            console.error("Error submitting farmer request:", error)
        );
};

const HandleViewContent = ({ view, issues, farmers, updateIssueStatus }) => {
    const renderFields = (data) => {
        return Object.keys(data).map((key) => (
            <div className="data" key={key}>
                <strong>{key}:</strong> {data[key]}
            </div>
        ));
    };

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
                                {renderFields(farmer)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (view === "requestFarmer") {
        // Fix for rendering RequestFarmerForm
        return <RequestFarmerForm onSubmit={handleFarmerRequestSubmit} />;
    } else {
        const filteredIssues = issues[view] || [];

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
                                    {renderFields(issue)}
                                    {view !== "completed" && (
                                        <button
                                            onClick={() =>
                                                updateIssueStatus(issue.issueID)
                                            }
                                        >
                                            OK
                                        </button>
                                    )}
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

    useEffect(() => {
        // Fetch issues
        fetch("http://localhost:3000/getIssues")
            .then((response) => response.json())
            .then((data) => {
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
                    } else if (issue.status === "completed") {
                        categorizedIssues.completed.push(issue);
                    }
                });

                setIssues(categorizedIssues);
            })
            .catch((error) => console.error("Error fetching issues:", error));
    }, []);

    useEffect(() => {
        // Fetch farmers
        fetch("http://localhost:3000/getFarmers")
            .then((response) => response.json())
            .then((data) => {
                setFarmers(data);
            })
            .catch((error) => console.error("Error fetching farmers:", error));
    }, []);

    const updateIssueStatus = (issueID) => {
        fetch("http://localhost:3000/updateIssueStatus", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ issueID }),
        })
            .then((response) => response.json())
            .then(() => {
                // Re-fetch issues after status update
                fetch("http://localhost:3000/getIssues")
                    .then((response) => response.json())
                    .then((data) => {
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
                            } else if (issue.status === "completed") {
                                categorizedIssues.completed.push(issue);
                            }
                        });

                        setIssues(categorizedIssues);
                    });
            })
            .catch((error) =>
                console.error("Error updating issue status:", error)
            );
    };

    const handleSidebarClick = (view) => {
        setSelectedView(view);
    };

    return (
        <div className="private-dashboard-home">
            <div className="sidebar-div">
                <SidebarPrivate onClick={handleSidebarClick} />
            </div>

            <div className="private-view-content">
                <HandleViewContent
                    view={selectedView}
                    issues={issues}
                    farmers={farmers}
                    updateIssueStatus={updateIssueStatus}
                />
            </div>
        </div>
    );
}

export default PrivateDashboard;
