const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Db/database.js");

// Routes
const bookSetRoutes = require("./Routes/index.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/", bookSetRoutes);

const PORT = 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected !!!!!");
  app.listen(PORT, () => console.log(`Server running on port ===>>>> ${PORT}`));
});
