const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ CHANGE THIS: your MongoDB URI
mongoose.connect("mongodb+srv://RESCUE:res123@cluster0.twsbp8g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const requestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  latitude: Number,
  longitude: Number,
  disasterType: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const RescueRequest = mongoose.model("RescueRequest", requestSchema);

// API: Add rescue request
app.post("/api/rescue", async (req, res) => {
  try {
    const request = new RescueRequest(req.body);
    await request.save();
    res.status(201).json({ message: "Rescue request saved", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all rescue requests
app.get("/api/rescue", async (req, res) => {
  try {
    const requests = await RescueRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
