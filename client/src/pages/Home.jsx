import React, { useState } from "react";
import "../styles/Home.css";
import { Button, Navbar, Container } from 'react-bootstrap';
//import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">MyProject</a>
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
                <a className="nav-link active" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to MyProject</h1>
          <p className="lead">Simplify your workflow with our amazing tools</p>
          <a href="#features" className="btn btn-light btn-lg mt-3">Explore Features</a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <i className="bi bi-speedometer2 display-4 text-primary"></i>
                  <h5 className="card-title mt-3">Fast</h5>
                  <p className="card-text">Optimized for performance and speed.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <i className="bi bi-shield-lock display-4 text-primary"></i>
                  <h5 className="card-title mt-3">Secure</h5>
                  <p className="card-text">Top-notch security for your data.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <i className="bi bi-layout-text-sidebar display-4 text-primary"></i>
                  <h5 className="card-title mt-3">User-Friendly</h5>
                  <p className="card-text">An intuitive design for everyone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center py-4">
        <div className="container">
          <p className="mb-0">© 2024 MyProject. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
