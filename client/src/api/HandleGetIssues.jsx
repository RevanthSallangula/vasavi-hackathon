// HandleGetIssues.jsx
import React, { useEffect, useState } from "react";

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
            <div>
                <h4>Open Issues</h4>
                {issues.open.length === 0 ? (
                    <p>No open issues found</p>
                ) : (
                    <ul>
                        {issues.open.map((issue, index) => (
                            <li key={index}>{issue.issueName}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h4>Issues in Progress</h4>
                {issues.inProgress.length === 0 ? (
                    <p>No issues in progress</p>
                ) : (
                    <ul>
                        {issues.inProgress.map((issue, index) => (
                            <li key={index}>{issue.issueName}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h4>Completed Issues</h4>
                {issues.completed.length === 0 ? (
                    <p>No completed issues found</p>
                ) : (
                    <ul>
                        {issues.completed.map((issue, index) => (
                            <li key={index}>{issue.issueName}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HandleGetIssues;
