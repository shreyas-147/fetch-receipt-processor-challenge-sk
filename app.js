const express = require("express");
const app = express();
const port = 3000;

const { storeData, getDataById } = require("./logic");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/receipts/process", (req, res) => {
  const receivedData = req.body;
  if (receivedData != null) {
    res.json({
      id: storeData(receivedData),
    });
  } else {
    res.status(400).json({ message: "The receipt is invalid" });
  }
});

app.get("/receipts/:id/points", (req, res) => {
  const id = req.params.id;
  const data = getDataById(id);

  if (data) {
    res.json({
      points: data,
    });
  } else {
    res.status(404).json({ message: "No receipt found for that id" });
  }
});

app.listen(port, () => {
  console.log(`Web service is running on http://localhost:${port}`);
});
