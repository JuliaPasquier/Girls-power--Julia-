const { Router } = require("express");
const controller = require("../controllers/controller");
const { checkUser, requireAuth } = require("../middleware/authMiddleware");

const router = Router();

// General
router.get("/", checkUser, controller.dashboard_get);

// Login
router.get("/login", controller.login_get);
router.post("/login", controller.login_post);


// Register
router.get("/register", controller.register_get);
router.post("/register", controller.register_post);

// Profile
router.get("/profile", requireAuth, controller.profile_get);

// Create an offer
router.get("/create-offer", requireAuth, controller.create_get);
router.post("/create-offer", requireAuth, controller.create_post);

// Update an offer
router.get("/update-offer/:id", requireAuth, controller.update_get);
router.post("/update-offer/:id", requireAuth, controller.update_post);

// offer
router.get("/offer/:id", requireAuth, controller.offer_get);


// Logout
router.get("/logout", controller.logout_get);

module.exports = router;
