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

// Profile
router.get("/profile", requireAuth, controller.profile_get);

// Create an offer
router.get("/create-offer", requireAuth, controller.create_get);
router.post("/create-offer", requireAuth, controller.create_post);

// Update an offer
router.get("/update/:id", requireAuth, controller.update_get);
router.put("/update/:id", requireAuth, controller.update_put);

// offer
router.get("/offer/:id", requireAuth, controller.offer_get);
router.post("/offer/:id", requireAuth, controller.offer_get);


// Logout
router.get("/logout", controller.logout_get);

module.exports = router;
