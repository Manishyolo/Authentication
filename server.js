const app = require("./src/app");
const ConnectToDb = require("./src/config/db");


ConnectToDb();


app.listen(3000,()=>{
    console.log("server running on port 3000");
    
})