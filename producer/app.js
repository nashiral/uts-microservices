const express = require("express");
const bodyParser = require("body-parser");
const stompit = require("stompit");

const app = express();
app.use(bodyParser.json());

const connectOptions = {
  host: "localhost",
  port: 61613,
  connectHeaders: {
    host: "/",
    login: "admin",
    passcode: "admin",
  },
};

app.post("/register", (req, res) => {
  const { nama, email, prodi } = req.body;

  if (!nama || !email || !prodi) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  stompit.connect(connectOptions, (error, client) => {
    if (error) {
      console.error("Connection error:", error.message);
      return res.status(500).json({ message: "Broker error" });
    }

    const frame = client.send({
      destination: "/queue/registration_queue",
      "content-type": "application/json",
    });

    const message = JSON.stringify({ nama, email, prodi });

    frame.write(message);
    frame.end();

    console.log("[PRODUCER] Message sent:", message);

    res.json({
      message: "Pendaftaran sedang diproses, silakan cek email secara berkala.",
    });
  });
});

app.listen(3000, () => {
  console.log("Producer running on http://localhost:3000");
});