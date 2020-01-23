const { Router } = require("express");
const UserController = require("./controllers/UserController");
const SearchController = require("./controllers/SearchController");
const SessionController = require("./controllers/SessionController");
const ProfileController = require("./controllers/ProfileController");
const authMiddleware = require("./middlewares/auth");

const routes = Router();

// Public routes
routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);

// Private routes
routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.get('users/:id', UserController.show);

routes.get('/profiles', ProfileController.show)
routes.put('/profiles', ProfileController.update)

routes.get("/search", SearchController.index);

module.exports = routes;
