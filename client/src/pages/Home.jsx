import "../styles/Home.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            {/* <header className="hero-section">
    <h1>Welcome to FarmConnect</h1>
    <p>Empowering Farmers, One Crop at a Time</p>
       </header> */}

            {/* Navbar */}

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        AgriConnect
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#blogs">
                                    Blogs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-success text-white text-center py-5">
                <div className="container">
                    <h1>Welcome to AgriConnect</h1>
                    <p className="lead">Empowering Farmers with Technology</p>
                    <a href="#blogs" className="btn btn-light btn-lg mt-3">
                        Explore Blogs
                    </a>
                </div>
            </header>

            {/* Blogs Section */}
            <section id="blogs" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Latest Blogs</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/300x200"
                                    className="card-img-top"
                                    alt="Blog 1"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Crop Rotation Tips
                                    </h5>
                                    <p className="card-text">
                                        Learn how crop rotation can improve soil
                                        fertility and boost yields.
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/300x200"
                                    className="card-img-top"
                                    alt="Blog 2"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Organic Farming
                                    </h5>
                                    <p className="card-text">
                                        Discover the benefits of going organic
                                        for your farm and community.
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/300x200"
                                    className="card-img-top"
                                    alt="Blog 3"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Smart Irrigation
                                    </h5>
                                    <p className="card-text">
                                        Optimize water usage with smart
                                        irrigation techniques.
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-light text-center py-4">
                <div className="container">
                    <p className="mb-0">
                        ©️ 2024 AgriConnect. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
