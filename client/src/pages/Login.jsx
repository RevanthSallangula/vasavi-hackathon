import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [userType, setUserType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserTypeSelection = (type) => {
        setUserType(type);
        setUsername(""); // Reset fields on selection
        setPassword("");
    };

    const handleLogin = () => {
        if (username && password) {
            // Redirect based on user type
            if (userType === "Government Employee") {
                navigate("/governmentDashboard");
            } else if (userType === "Private Employee") {
                navigate("/privateDashboard");
            }
        } else {
            alert("Please enter both username and password.");
        }
    };

    return (
        <div className="container">
            <h2>Login as:</h2>
            <button
                className="btn"
                onClick={() => handleUserTypeSelection("Government Employee")}
            >
                Government Employee
            </button>
            <button
                className="btn"
                onClick={() => handleUserTypeSelection("Private Employee")}
            >
                Private Employee
            </button>

            {/* Render login form if a user type is selected */}
            {userType && (
                <div className="section">
                    <h3>{userType} Login</h3>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                    <button className="btn" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
