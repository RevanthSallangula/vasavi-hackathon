import React, { useState } from "react";
import "../styles/Login.css";

function Login() {
    const [userType, setUserType] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        alert(
            `Logging in as ${userType} with Username: ${username}, Email: ${email}`
        );
        // Reset fields after login or handle login logic here
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="container">
            <h2>Login as:</h2>
            <button
                className="btn"
                onClick={() => setUserType("Government Employee")}
            >
                Government Employee
            </button>
            <button
                className="btn"
                onClick={() => setUserType("Private Employee")}
            >
                Private Employee
            </button>

            {/* Render login form if a user type is selected */}
            {userType && (
                <div className="section">
                    <h3>{userType} Login</h3>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
