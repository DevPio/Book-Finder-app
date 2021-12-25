import http from "http";
import Router from "./Router/routes.js";

import db from "./config/index.js";
const port = 3000;

const routes = new Router();
const server = http.createServer(routes.handler.bind(routes));

server.listen(port, () => console.log(`Server is running at port ${port}`));
