const { model } = require("mongoose");
const { Schema} = require("mongoose");

const ledgerSchema = new Schema ({
    account : {
        type : String,
        require : true,

    },
    amount : {
        type : Number,
        require : true,
    },
    type:{
        type : String,
        require : true     
    },
    description:{
        type : String,
        require: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref:"Account",
    },
},{timestamps: true});
const ledgerModel = model("ledger", ledgerSchema);
module.exports= ledgerModel;