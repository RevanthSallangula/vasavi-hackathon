import React, { useState, useEffect } from "react";
import "../styles/PrivateDashboard.css";
import SidebarComponent from "../components/SidebarComponent";
import HandleGetIssues from "../api/HandleGetIssues";

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
