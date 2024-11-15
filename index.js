const { connect } = require("mongoose");
const app = require("./app");
const router = require("./route/route");
PORT= 7000;
app.use("/api/v1", router)
app.use((err, req, res , next) =>{
    res.status(err.status || 500).json({error: err.message})
})
app.listen(PORT,()=>{
    try {
        console.log("connecting to database...")
        connect("mongodb://localhost:27017/budgetDatabase")
        console.log("Database connected sucessfully...")
        console.log(`Server is running on : http://Localhost:${PORT}`)
    } catch (error) {
        console.log(error);
        process.exist(-1);
    }
})