const { default: mongoose } = require("mongoose");
const { APIError } = require("../middleware/APIError");
const accountModel = require("../models/accountModel");
const { buildAccount } = require("../utils/utils");
// const { default: mongoose } = require("mongoose");
exports.createAccount = async(req, res, next )=>{
    try {
       const{name, track, gender}=req.body;
       if(!name) return next(APIError.badRequest("Name is required"));
       if(!track) return next(APIError.badRequest("Track is required"));
       if(!gender) return next(APIError.badRequest("Gender is required"));
       if(gender !== "male" && gender !== "female")return next (APIError.customError("invalid gender"));
    //    const createdAt = Date.now();
    const newAccount={
        name,
        track,
        gender,
    }
     const createAccount = await accountModel.create({...newAccount})
    res.status(200).json({message: "Account created successfully"})
    } catch (error) {
        // console.log(error)
        next(error)
    }
};
exports.updateAccount = async (req, res , next )=>{
    try {
        const {id} = req.body;
        if(!id) return next (APIError.badRequest("Account ID is required"));
        const info = {};
        delete req.body.id;
        for(let key in req.body){
            info[key]= req.body[key];
        }
    const userExist = await accountModel.findByIdAndUpdate(id, {...info}, {returnOriginal:false})
    if(!userExist)return next (APIError.notFound("User does not exist"))
    res.status(200).json({message: " User updated sucessfully"})
    } catch (error) {
        next(error);
    }
    // const { id } = req.query;
    // console.log(id);
    // const { name, track, gender } = req.body;

    // try {
    //     // Find account by ID and update
    //     const updatedAccount = await accountModel.findByIdAndUpdate(
    //         id,
    //         { name, track , gender },
    //         { new: true } // Return the updated document and apply schema validation
    //     );

    //     if (!updatedAccount) {
    //         return res.status(404).json({ error: "Account not found" });
    //     }

    //     res.json(updatedAccount);
    // } catch (error) {
    //     console.log(error);
    //     next(error);
    // }
};
exports.getAccount = async (reeq, res, next)=>{
    try {
        const account = await accountModel.find({}).select("-__v")
            if(!account || account.length === 0 )
                return  res.status(404).json({message:"No record found"})

        const newAccount = account.map((cur) => {
            return buildAccount(cur.toObject())
        })
         res.status(200).json({message: "Account found", account:newAccount})
    } catch (error) {
        next(error)
    }
}
exports.getAccountById = async (req , res, next )=>{
    try {
        const {id} = req.query;
        if(!id) return next (APIError.badRequest("Id is required"));
        const user = await accountModel.findById(id);
        if(!user) return next (APIError.notFound("User is not found"));
        res.status(200).json({message : " Found", user})
    } catch (error) {
        next(error);
    }
} 