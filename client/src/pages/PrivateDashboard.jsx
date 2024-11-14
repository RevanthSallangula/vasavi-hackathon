import React, { useState, useEffect } from "react";
import "../styles/PrivateDashboard.css";
import SidebarComponent from "../components/SidebarComponent";

const HandleGetIssues = ({ view, issues }) => {
    if (!issues || typeof issues !== "object") {
        return <p>Invalid issues data</p>;
    }

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
                    found
                </p>
            ) : (
                <ul>
                    {filteredIssues.map((issue, index) => (
                        <li key={index}>
                            <div className="issue-item">
                                <h2>Issue Tracker</h2>
                                <div className="data">
                                    <strong>Issue ID:</strong> {issue.issueID}
                                </div>
                                <div className="data">
                                    <strong>Issue Name:</strong>{" "}
                                    {issue.issueName}
                                </div>
                                <div className="data">
                                    <strong>Farmer ID:</strong> {issue.farmerID}
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
};
function PrivateDashboard() {
    const [selectedView, setSelectedView] = useState("open"); // default view is 'open'
    const [issues, setIssues] = useState({
        open: [],
        inProgress: [],
        completed: [],
    });

    // Fetch the issues when the component mounts
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
            .catch((error) => {
                console.error("Error fetching issues:", error);
            });
    }, []);

    const handleSidebarClick = (view) => {
        setSelectedView(view);
    };

    return (
        <div className="private-dashboard-home">
            <div className="sidebar">
                <SidebarComponent onClick={handleSidebarClick} />
            </div>

            <div className="private-view-content">
                <HandleGetIssues view={selectedView} issues={issues} />
            </div>
        </div>
    );
}

export default PrivateDashboard;
