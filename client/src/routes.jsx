import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import Login from "./pages/Login";
import PrivateDashboard from "./pages/PrivateDashboard";
import Home from "./pages/Home";
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
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />

                <Route
                    path="/privateDashboard"
                    element={<PrivateDashboard />}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
