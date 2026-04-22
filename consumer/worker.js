const stompit = require("stompit");

const connectOptions = {
  host: "localhost",
  port: 61613,
  connectHeaders: {
    host: "/",
    login: "admin",
    passcode: "admin",
  },
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.error("Connection error:", error.message);
    return;
  }

  const subscribeHeaders = {
    destination: "/queue/registration_queue",
    ack: "auto",
  };

  client.subscribe(subscribeHeaders, (error, message) => {
    if (error) {
      console.error("Subscribe error:", error.message);
      return;
    }

    message.readString("utf-8", (error, body) => {
      if (error) {
        console.error("Read message error:", error.message);
        return;
      }

      const data = JSON.parse(body);

      console.log("\n[LOG] Mengirim email verifikasi ke:", data.email);
      console.log(
        `[LOG] Berhasil! User ${data.nama} dari prodi ${data.prodi} telah terdaftar.\n`
      );
    });
  });

  console.log("Worker is listening to queue...");
});