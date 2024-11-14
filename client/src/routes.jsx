import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import Login from "./pages/Login";
import PrivateView from "./pages/PrivateView";

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
                <Route path="/privateView" element={<PrivateView />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
