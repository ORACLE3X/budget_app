const {  createAccount, updateAccount, getAccount, getAccountById } = require("../controller/accountHandlers");
const { createLedger, getLedger, balanceSummary } = require("../controller/ledgerHandlers");
const { APIError } = require("../middleware/APIError")

const router = require("express").Router()
router.post("/account", createAccount);
router.put("/account", updateAccount);
router.get("/account", getAccount);
router.get("/account_id", getAccountById)
router.post("/ledger", createLedger).get("/ledger/get", getLedger).get("/ledger/summary", balanceSummary)
router.use("*" , APIError.notFound);
module.exports = router;