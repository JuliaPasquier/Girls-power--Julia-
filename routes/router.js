const { Router } = require("express");
const controller = require("../controllers/controller");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

// General
router.get("/", requireAuth, controller.dashboard_get);

// Login
router.get("/login", controller.login_get);
router.post("/login", controller.login_post);

// Register
router.get("/register", controller.register_get);
router.post("/register", controller.register_post);

// Logout
router.get("/logout", controller.logout_get);

// Profile
router.get("/profile", requireAuth, controller.profile_get);

// Create
router.get("/create", requireAuth, controller.create_get);
router.post("/create", requireAuth, controller.create_post);

// Update
router.get("/update/:id", requireAuth, controller.update_get);
router.put("/update/:id", requireAuth, controller.update_put);

module.exports = router;
