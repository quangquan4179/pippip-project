const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/drivers",require("./routes/api/drivers"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/userprofile", require("./routes/api/userProfile"));
app.use("/api/driverprofile", require("./routes/api/driverProfile"));
app.use("/api/distance", require("./routes/api/distance"));
app.listen(PORT, () => {
  console.log(` Server started on port: ${PORT}`);
});
