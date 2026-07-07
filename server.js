require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth.routes");
const availabilityRoutes = require("./src/routes/availability.routes");
const publicRoutes = require("./src/routes/public.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");


const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/public-booking", publicRoutes);

app.get("/", (req, res) => {
  res.send("Scheduler API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});