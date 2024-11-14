import React, { useEffect, useState } from "react";
import "../styles/handleGetIssues.css";
const HandleGetIssues = () => {
    const [issues, setIssues] = useState({
        open: [],
        inProgress: [],
        completed: [],
    });

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:3000/getIssues")
            .then((response) => response.json())
            .then((data) => {
                // Filter issues based on status
                const openIssues = data.filter(
                    (issue) => issue.status === "open"
                );
                const inProgressIssues = data.filter(
                    (issue) => issue.status === "taken"
                );
                const completedIssues = data.filter(
                    (issue) => issue.status === "finished"
                );

                // Set state with the filtered issues
                setIssues({
                    open: openIssues,
                    inProgress: inProgressIssues,
                    completed: completedIssues,
                });
            })
            .catch((error) => {
                console.error("Error fetching issues:", error);
            });
    }, []);

    return (
        <div>
            {/* Open Issues */}
            <div>
                <h4>Open Issues</h4>
                {issues.open.length === 0 ? (
                    <p>No open issues found</p>
                ) : (
                    <ul>
                        {issues.open.map((issue, index) => (
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

            {/* Issues in Progress */}
            <div>
                <h4>Issues in Progress</h4>
                {issues.inProgress.length === 0 ? (
                    <p>No issues in progress</p>
                ) : (
                    <ul>
                        {issues.open.map((issue, index) => (
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

            {/* Completed Issues */}
            <div>
                <h4>Completed Issues</h4>
                {issues.completed.length === 0 ? (
                    <p>No completed issues found</p>
                ) : (
                    <ul>
                        {issues.open.map((issue, index) => (
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
        </div>
    );
};

export default HandleGetIssues;
