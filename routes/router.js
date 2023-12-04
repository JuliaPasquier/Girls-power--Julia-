const { Router } = require("express");
const controller = require("../controllers/controller");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

// General
router.get("/", requireAuth, controller.dashboard_get);

// Register
router.get("/signup", controller.signup_get);
router.post("/signup", controller.signup_post);

// Login
router.get("/login", requireAuth, controller.login_get);
router.post("/login", controller.login_post);

// Logout
router.get("/logout", controller.logout_get);

// Profile
router.get("/profile", requireAuth, controller.profile_get);

// Create
router.get("/create", requireAuth,controller.create_get);
router.post("/create", requireAuth, controller.create_post);

// Update
router.get("/update", requireAuth, controller.update_get);
router.put("/update", requireAuth, controller.update_put);

module.exports = router;
