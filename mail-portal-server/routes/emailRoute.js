const express = require("express");
const { checkLogin } = require("../middlewere/common/checkLogin");
const { sendMail, myEmails, sentEmails, undoEmail, singleEmail, binEmail, myBinEmails, restoreEmail, addStar, removeStar, starredEmails } = require("../controllers/emailController");

const router = express.Router();

router.post('/send' , checkLogin , sendMail)
router.get('/myEmails' , checkLogin , myEmails)
router.get('/sentEmails' , checkLogin , sentEmails)
router.post("/undoEmail" , checkLogin , undoEmail)
router.post("/singleEmail" , checkLogin ,  singleEmail)
router.get('/myBinEmails', checkLogin , myBinEmails)
router.put('/binEmail' , checkLogin , binEmail)
router.put("/restoreEmail" , checkLogin , restoreEmail)
router.put("/addStar" , checkLogin , addStar)
router.put("/removeStar" , checkLogin , removeStar)
router.get('/starredEmails', checkLogin , starredEmails)


module.exports = router;