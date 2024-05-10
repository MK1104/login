const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.get("/register", (req,res) => {
    res.render("register")
});
router.post("/register", authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.get("/login", (req,res) => {
    res.render("login")
});
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", verifyToken, authController.logOut);

module.exports = router;