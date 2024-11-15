const {  createAccount, updateAccount, getAccount, getAccountById } = require("../controller/accountHandlers");
const { APIError } = require("../middleware/APIError")

const router = require("express").Router()
router.post("/account", createAccount);
router.put("/account", updateAccount);
router.get("/account", getAccount);
router.get("/account_id", getAccountById)
router.use("*" , APIError.notFound);
module.exports = router;