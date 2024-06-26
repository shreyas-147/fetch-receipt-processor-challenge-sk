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

  const id = storeData(receivedData);

  res.json({
    id: id,
  });
});

app.get("/receipts/:id/points", (req, res) => {
  const id = req.params.id;
  const data = getDataById(id);

  if (data) {
    res.json({
      points: data,
    });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

app.listen(port, () => {
  console.log(`Web service is running on http://localhost:${port}`);
});
