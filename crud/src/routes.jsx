import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

const DashboardWrapper = () => {
    // const { hallNumber } = useParams();
    // return <Dashboard hallID={hallNumber} />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* <Route
                    path="/hall/:hallNumber"
                    element={<DashboardWrapper />}
                /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
