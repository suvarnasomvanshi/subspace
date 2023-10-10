import express from "express";

import _ from "lodash";
import router from "./router"



const app = express();
const port = 5000;


//middelwares
app.use(express.Router());
app.use((error,req,res,next)=>{
    console.log(`error is ${error.msg}`)
})
app.use('/api',router)


app.listen(port,()=>{
    console.log(`listening to port:${port}`)
})