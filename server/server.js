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

server.post("/addHiddenFarmer", async (req, res) => {
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
        const farmerRef = ref(database, `hiddenFarmers/${farmerID}`);
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

// Get Farmers
server.get("/getFarmers", async (req, res) => {
    try {
        const farmersRef = ref(database, "farmers");
        const snapshot = await get(farmersRef);

        if (snapshot.exists()) {
            const farmers = snapshot.val();
            const farmersArray = Object.entries(farmers).map(
                ([id, details]) => ({
                    farmerID: id,
                    ...details,
                })
            ); // Include the farmerID in each farmer's details
            res.status(200).json(farmersArray);
        } else {
            res.status(404).json({ message: "No farmers found." });
        }
    } catch (error) {
        console.error("Error fetching farmers:", error);
        res.status(500).json({ message: "Failed to fetch farmers." });
    }
});

server.get("/getHiddenFarmers", async (req, res) => {
    try {
        const farmersRef = ref(database, "hiddenFarmers");
        const snapshot = await get(farmersRef);

        if (snapshot.exists()) {
            const farmers = snapshot.val();
            const farmersArray = Object.entries(farmers).map(
                ([id, details]) => ({
                    farmerID: id,
                    ...details,
                })
            ); // Include the farmerID in each farmer's details
            res.status(200).json(farmersArray);
        } else {
            res.status(404).json({ message: "No farmers found." });
        }
    } catch (error) {
        console.error("Error fetching farmers:", error);
        res.status(500).json({ message: "Failed to fetch farmers." });
    }
});

// Add Issue
server.post("/addIssues", async (req, res) => {
    const {
        issueID = "None",
        issueName = "None",
        farmerID = "None",
        farmerName = "None",
        issueDescription = "None",
    } = req.body;

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
            issueDescription,
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

// Update Issue Status
server.put("/updateIssueStatus", async (req, res) => {
    const { issueID } = req.body;

    // Validate required field
    if (!issueID) {
        return res.status(400).json({ message: "issueID is required." });
    }

    try {
        const issuesRef = ref(database, "Issues");
        const snapshot = await get(issuesRef);

        if (snapshot.exists()) {
            const issues = snapshot.val();
            const issueKey = Object.keys(issues).find(
                (key) => issues[key].issueID === issueID
            );

            if (!issueKey) {
                return res.status(404).json({ message: "Issue not found." });
            }

            const currentStatus = issues[issueKey].status;

            let newStatus;
            if (currentStatus === "open") {
                newStatus = "taken";
            } else if (currentStatus === "taken") {
                newStatus = "completed";
            } else {
                return res
                    .status(400)
                    .json({ message: "Issue is already completed." });
            }

            // Update the issue's status in the database
            await set(ref(database, `Issues/${issueKey}/status`), newStatus);

            res.status(200).json({
                message: `Issue status updated successfully to ${newStatus}.`,
            });
        } else {
            res.status(404).json({ message: "No issues found." });
        }
    } catch (error) {
        console.error("Error updating issue status:", error);
        res.status(500).json({ message: "Failed to update issue status." });
    }
});

server.post("/logInput", (req, res) => {
    console.log("Received Input:", req.body); // Log the input to the console
    res.status(200).json({ message: "Input logged successfully." });
});

// Get Issue Status by issueID
server.post("/getIssueStatus", async (req, res) => {
    const { issueID } = req.body;

    if (!issueID) {
        return res.status(400).json({ message: "issueID is required." });
    }

    try {
        const issuesRef = ref(database, "Issues");
        const snapshot = await get(issuesRef);
        console.log("ISSUE ID:", req.body);

        if (snapshot.exists()) {
            const issues = snapshot.val();
            // console.log("Issues:", issues);

            const issueKey = Object.keys(issues).find(
                (key) => String(issues[key].issueID) === String(issueID) // Convert both to string
            );

            if (!issueKey) {
                return res.status(404).json({ message: "Issue not found." });
            }

            const issueStatus = issues[issueKey].status;
            res.status(200).json({ issueID, status: issueStatus });
        } else {
            res.status(404).json({ message: "No issues found." });
        }
    } catch (error) {
        console.error("Error fetching issue status:", error);
        res.status(500).json({ message: "Failed to fetch issue status." });
    }
});

server.post("/addFarmerRequest", async (req, res) => {
    const { cropType, landArea } = req.body;

    // Validate required fields
    if (!cropType || !landArea) {
        return res.status(400).json({
            message: "Both cropType and landArea are required.",
        });
    }

    try {
        // Generate a unique request ID (timestamp-based or UUID can be used)
        const requestID = `REQ_${Date.now()}`;

        const requestRef = ref(database, `FarmerRequests/${requestID}`);
        await set(requestRef, {
            cropType,
            landArea,
            status: "pending",
        });

        res.status(200).json({
            message: "Request submitted successfully.",
            requestID,
        });
    } catch (error) {
        console.error("Error submitting request:", error);
        res.status(500).json({ message: "Failed to submit request." });
    }
});

server.get("/getFarmerRequests", async (req, res) => {
    try {
        const snapshot = await get(ref(database, "FarmerRequests"));
        const requests = snapshot.exists()
            ? Object.entries(snapshot.val()).map(([id, data]) => ({
                  id,
                  ...data,
              }))
            : [];
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Failed to fetch requests." });
    }
});

server.post("/approveFarmers", async (req, res) => {
    const { farmerCropType, farmerFieldArea } = req.body;

    // Validate required fields
    if (!farmerCropType || !farmerFieldArea) {
        return res.status(400).json({
            message: "FarmerCropType and FarmerFieldArea are required.",
        });
    }

    try {
        // Reference to hidden farmers
        const hiddenFarmersRef = ref(database, "hiddenFarmers");
        const hiddenFarmersSnapshot = await get(hiddenFarmersRef);

        if (!hiddenFarmersSnapshot.exists()) {
            return res
                .status(404)
                .json({ message: "No hidden farmers found." });
        }

        const hiddenFarmers = hiddenFarmersSnapshot.val();
        const matchingFarmers = Object.entries(hiddenFarmers).filter(
            ([id, farmer]) =>
                farmer.farmerCropType === farmerCropType &&
                farmer.farmerFieldArea === farmerFieldArea
        );

        if (matchingFarmers.length === 0) {
            return res
                .status(404)
                .json({ message: "No matching hidden farmers found." });
        }

        // Move each matching farmer from hiddenFarmers to farmers
        for (const [id, farmer] of matchingFarmers) {
            const farmerRef = ref(database, `farmers/${id}`);
            const hiddenFarmerRef = ref(database, `hiddenFarmers/${id}`);

            // Add farmer to farmers
            await set(farmerRef, farmer);

            // Delete farmer from hiddenFarmers
            await set(hiddenFarmerRef, null);
        }

        // Reference to farmerRequests and fetch data
        const farmerRequestsRef = ref(database, "farmerRequests");
        const requestSnapshot = await get(farmerRequestsRef);

        if (!requestSnapshot.exists()) {
            return res
                .status(404)
                .json({ message: "No farmer requests found." });
        }

        const farmerRequests = requestSnapshot.val();
        console.log("Farmer Requests Data:", farmerRequests); // Log the structure to debug

        // Handle case if there are no requests
        if (!farmerRequests || Object.keys(farmerRequests).length === 0) {
            return res
                .status(404)
                .json({ message: "No requests found in the database." });
        }

        // Filter matching requests based on crop type and field area
        const matchingRequests = Object.entries(farmerRequests).filter(
            ([id, request]) =>
                request.farmerCropType === farmerCropType &&
                request.farmerFieldArea === farmerFieldArea
        );

        if (matchingRequests.length === 0) {
            return res
                .status(404)
                .json({ message: "No matching requests found." });
        }

        // Delete matching requests from the farmerRequests
        for (const [id] of matchingRequests) {
            const requestRef = ref(farmerRequestsRef, id);
            await set(requestRef, null); // Delete the request
        }

        res.status(200).json({
            message: `${matchingFarmers.length} farmers approved and ${matchingRequests.length} requests deleted successfully.`,
        });
    } catch (error) {
        console.error("Error approving farmers:", error);
        res.status(500).json({ message: "Failed to approve farmers." });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
