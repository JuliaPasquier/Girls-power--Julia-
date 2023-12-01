const { Router } = require("express");
const controller = require("../controllers/controller");

const router = Router();

router.get("/", controller.dashboard_get);
router.get("/signup", controller.signup_get);
router.post("/signup", controller.signup_post);
router.get("/login", controller.login_get);
router.post("/login", controller.login_post);
router.get("/logout", controller.logout_get);
router.get("/profile", controller.profile_get);
router.get("/create", controller.create_get);
router.post("/create", controller.create_post);
router.get("/update", controller.update_get);
router.put("/update", controller.update_put);

module.exports = router;
