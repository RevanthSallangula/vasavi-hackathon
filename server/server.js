const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

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
server.use(bodyParser.json());

server.post("/addFarmer", (req, res) => {
    const { id, name, age, location } = req.body;

    if (!id || !name || !age || !location) {
        return res
            .status(400)
            .send("All fields (id, name, age, location) are required.");
    }
    const farmerRef = ref(database, `farmers/${id}`);
    set(farmerRef, { name, age, location })
        .then(() => {
            res.status(200).send("Farmer added successfully.");
        })
        .catch((error) => {
            console.error("Error adding farmer:", error);
            res.status(500).send("Failed to add farmer.");
        });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
