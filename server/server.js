const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get, set, push } = require("firebase/database");

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const server = express();
const cors = require("cors"); // Import the cors package

server.use(bodyParser.json());
server.use(cors()); // Enable CORS for all origins

server.post("/addFarmer", (req, res) => {
    const {
        farmerID,
        farmerName,
        farmerAge,
        farmerLocation,
        farmerFieldArea,
        FarmerCropType,
    } = req.body;

    if (
        !farmerID ||
        !farmerName ||
        !farmerAge ||
        !farmerLocation ||
        !farmerFieldArea ||
        !FarmerCropType
    ) {
        return res.status(400).json({
            message:
                "All fields (farmerID, farmerName, farmerAge, farmerLocation, farmerFieldArea, FarmerCropType) are required.",
        });
    }

    const farmerRef = ref(database, `farmers/${farmerID}`);
    set(farmerRef, {
        farmerName,
        farmerAge,
        farmerLocation,
        farmerFieldArea,
        FarmerCropType,
    })
        .then(() => {
            res.status(200).json({ message: "Farmer added successfully." });
        })
        .catch((error) => {
            console.error("Error adding farmer:", error);
            res.status(500).json({ message: "Failed to add farmer." });
        });
});

server.post("/addIssues", (req, res) => {
    const { issueID, issueName, farmerID, farmerName } = req.body;

    // Check if all required fields are provided
    if (!issueID || !issueName || !farmerID || !farmerName) {
        return res
            .status(400)
            .send(
                "All fields (issueID, issueName, farmerID, farmerName) are required."
            );
    }

    // Reference to the Issues node in the Firebase Database
    const issuesRef = ref(database, "Issues");

    // Fetch current issues to determine the next index
    get(issuesRef)
        .then((snapshot) => {
            let nextIndex = 0;
            if (snapshot.exists()) {
                // Find the next available index (sequential)
                const issues = snapshot.val();
                nextIndex = Object.keys(issues).length;
            }

            // Create the new issue object
            const newIssue = {
                issueID,
                issueName,
                farmerID,
                farmerName,
                assignedID: "None", // Default value for assignedID
                assignedName: "None", // Default value for assignedName
                status: "open", // Default value for status
            };

            // Use the next index as the key
            set(ref(database, `Issues/${nextIndex}`), newIssue)
                .then(() => {
                    res.status(200).send("Issue added successfully.");
                })
                .catch((error) => {
                    console.error("Error adding issue:", error);
                    res.status(500).send("Failed to add issue.");
                });
        })
        .catch((error) => {
            console.error("Error fetching issues:", error);
            res.status(500).send("Failed to fetch issues.");
        });
});

server.get("/getIssues", (req, res) => {
    const issuesRef = ref(database, "Issues");

    get(issuesRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const issues = snapshot.val();
                const issuesArray = Object.values(issues); // Convert object to array
                res.status(200).json(issuesArray); // Send issues as an array
            } else {
                res.status(404).send("No issues found");
            }
        })
        .catch((error) => {
            console.error("Error fetching issues:", error);
            res.status(500).send("Failed to fetch issues");
        });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
