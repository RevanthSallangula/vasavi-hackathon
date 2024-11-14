import React from "react";
import "../styles/handleGetIssues.css";

const HandleGetIssues = ({ view, issues }) => {
    // Validate that issues object is available and contains the expected properties
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

export default HandleGetIssues;
