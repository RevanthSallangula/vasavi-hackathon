const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

// Firebase Admin SDK initialization
const serviceAccount = require("./path/to/serviceAccountKey.json"); // replace with the path to your Firebase service account JSON

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vasavi-4b1a7-default-rtdb.firebaseio.com", // replace with your database URL
});

const db = admin.database();
const app = express();
app.use(bodyParser.json());

// Endpoint to add a farmer to the database
app.post("/addFarmer", (req, res) => {
    const { id, name, age, location } = req.body;

    if (!id || !name || !age || !location) {
        return res
            .status(400)
            .send("All fields (id, name, age, location) are required.");
    }

    const farmerRef = db.ref("farmers/" + id);

    farmerRef
        .set({ name, age, location })
        .then(() => {
            res.status(200).send("Farmer added successfully.");
        })
        .catch((error) => {
            console.error("Error adding farmer:", error);
            res.status(500).send("Failed to add farmer.");
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
