const { Router } = require("express");
const UserController = require("./controllers/UserController");
const SearchController = require("./controllers/SearchController");
const SessionController = require("./controllers/SessionController");
const authMiddleware = require("./middlewares/auth");

const routes = Router();

// Public routes
routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);
routes.get("/users", UserController.index);
routes.get("/search", SearchController.index);

// Private routes
routes.use(authMiddleware);


module.exports = routes;
