const { APIError } = require("../middleware/APIError");
const accountModel = require("../models/accountModel");
const ledgerModel = require("../models/ledgerModel");

exports.createLedger = async (req, res, next)=>{
    try {
        const {accountId , amount , type, description } = req.body;
        if(!accountId) return next (APIError.badRequest("Account is needed"));
        if(!amount) return next (APIError.badRequest("Amount is needed"));
        if(!type) return next (APIError.badRequest("Type is needed"));
        if(!description) return next (APIError.badRequest("This ledger needs a description"));
        const ledger = {
            amount,
            type,
            description,
            account : accountId
        }
        const ledgerExist = await accountModel.findById(accountId);
        if(!ledgerExist)return next (APIError.badRequest("user inavalid(not found)"));
        const createLedger = await ledgerModel.create({...ledger});
        res.status(201).json({message: "Ledger created successfully"})
    } catch (error) {
        console.log(`this is our error ${error}`)
        next(error)
    }
};
exports.getLedger = async (req,res, next)=>{
    try {
        const transactions = await ledgerModel.find({ userId: req.params.userId });
        res.json(transactions);
    } catch (error) {
       next(error);
    }
};
//To get balance summary for all users
exports.balanceSummary = async (req, res, next)=>{
    try {
        const transactions = await ledgerModel.find({ userId: req.params.userId }); //get ledger

        const income = transactions
            .filter((t) => t.type === 'income')//specify type to income
            .reduce((acc, t) => acc + t.amount, 0);

        const expense = transactions
            .filter((t) => t.type === 'expense')//specify type to expenses
            .reduce((acc, t) => acc + t.amount, 0);

        const balance = income - expense;

        res.json({ income, expense, balance });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}