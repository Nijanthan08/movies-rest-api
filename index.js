const express = require("express");
const config = require("config");
const app = express();

const logger = require("./src/startup/loggerConfig");
require("./src/startup/sqlConnection");
require("./src/startup/routes")(app);

const port = config.get("port");
app.listen(port, () => logger.info(`Started Application at port ${port}`));
