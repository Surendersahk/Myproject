const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect(
  "mongodb+srv://RESCUE:res123@cluster0.twsbp8g.mongodb.net/rescueDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Mongo Error:", err));

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

// 📌 API: Add rescue request
app.post("/api/rescue", async (req, res) => {
  try {
    const request = new RescueRequest(req.body);
    await request.save();
    res.status(201).json({ message: "Rescue request saved", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 API: Get all rescue requests
app.get("/api/rescue", async (req, res) => {
  try {
    const requests = await RescueRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 API: Update request status
app.put("/api/rescue/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await RescueRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));

