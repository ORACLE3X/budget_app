const { Schema, model } = require("mongoose");

const accountSchema = new Schema ({
    name : {
        type : String,
        require : true
    },
    track : {
        type : String,
        require : true,

    },
    gender :{
        type : String,
        require : true,
        enum : ["male", "female"],
    }
}, {timestamps: true}
);
const accountModel = model("Account", accountSchema);
module.exports = accountModel