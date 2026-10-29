import app from "./src/app.js";
import connectDb from "./src/config/database.js";

// app.use("/",(req,res)=>{                             //(check working or not )
//     res.send("Testing backend worked ?")
// })
connectDb() // database run 
app.listen(3000,()=>{
    console.log("App listening on port 3000")
})