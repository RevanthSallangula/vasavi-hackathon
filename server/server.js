const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get, set } = require("firebase/database");
const cors = require("cors"); // Import the CORS package

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzGM4wrLwmkfKFeeVVBZHRJyA1JOZQL_8",
    authDomain: "vasavi-hackathon.firebaseapp.com",
    databaseURL:
        "https://vasavi-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vasavi-hackathon",
    storageBucket: "vasavi-hackathon.firebasestorage.app",
    messagingSenderId: "252214439710",
    appId: "1:252214439710:web:282691accc912e1483230f",
};

// Initialize Firebase and database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize Express
const server = express();
// Middleware
server.use(bodyParser.json());
server.use(
    cors({
        origin: "*", // Replace with specific origins if needed
    })
);

// Endpoints
// Add Farmer
server.post("/addFarmer", async (req, res) => {
    const {
        farmerID,
        farmerName,
        farmerAge,
        farmerLocation,
        farmerFieldArea,
        farmerCropType,
        farmerClient,
    } = req.body;

    // Validate required fields
    if (
        !farmerID ||
        !farmerName ||
        !farmerAge ||
        !farmerLocation ||
        !farmerFieldArea ||
        !farmerCropType ||
        !farmerClient
    ) {
        return res.status(400).json({
            message:
                "All fields (farmerID, farmerName, farmerAge, farmerLocation, farmerFieldArea, farmerCropType, farmerClient) are required.",
        });
    }

    try {
        const farmerRef = ref(database, `farmers/${farmerID}`);
        await set(farmerRef, {
            farmerName,
            farmerAge,
            farmerLocation,
            farmerFieldArea,
            farmerCropType,
            farmerClient,
        });
        res.status(200).json({ message: "Farmer added successfully." });
    } catch (error) {
        console.error("Error adding farmer:", error);
        res.status(500).json({ message: "Failed to add farmer." });
    }
});

// Add Issue
server.post("/addIssues", async (req, res) => {
    const { issueID, issueName, farmerID, farmerName } = req.body;

    // Validate required fields
    if (!issueID || !issueName || !farmerID || !farmerName) {
        return res.status(400).json({
            message:
                "All fields (issueID, issueName, farmerID, farmerName) are required.",
        });
    }

    try {
        const issuesRef = ref(database, "Issues");
        const snapshot = await get(issuesRef);
        let nextIndex = 0;

        if (snapshot.exists()) {
            const issues = snapshot.val();
            nextIndex = Object.keys(issues).length;
        }

        const newIssue = {
            issueID,
            issueName,
            farmerID,
            farmerName,
            assignedID: "None",
            assignedName: "None",
            status: "open",
        };

        await set(ref(database, `Issues/${nextIndex}`), newIssue);
        res.status(200).json({ message: "Issue added successfully." });
    } catch (error) {
        console.error("Error adding issue:", error);
        res.status(500).json({ message: "Failed to add issue." });
    }
});

// Get Issues
server.get("/getIssues", async (req, res) => {
    try {
        const issuesRef = ref(database, "Issues");
        const snapshot = await get(issuesRef);

        if (snapshot.exists()) {
            const issues = snapshot.val();
            const issuesArray = Object.values(issues);
            res.status(200).json(issuesArray);
        } else {
            res.status(404).json({ message: "No issues found." });
        }
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ message: "Failed to fetch issues." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
