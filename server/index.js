import express from "express"
import "./utils/db.js";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}

))
app.use(express.json());
app.use("/auth",adminRouter)


app.listen(3000,()=>{
console.log("Server is running")

})
app.get("/",(req,resp)=>{
    resp.send("backend is running");
})