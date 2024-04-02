const express = require("express");
const { login, signup, uploadProfilePic, removeProfilePic, userData } = require("../controllers/userController");
const { checkLogin } = require("../middlewere/common/checkLogin");

const router = express.Router();

router.post("/login" , login)
router.post("/signup" , signup)
router.put('/uploadProfilePic' , checkLogin , uploadProfilePic)
router.put("/removeProfilePic" , checkLogin , removeProfilePic)
router.post('/userData', checkLogin, userData)

module.exports = router;