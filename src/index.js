import express from "express";


const app=new express();

app.get("/",(req,res)=>{
    res.send("hello");
})


app.listen(5000,()=>{
    console.log(`server is starting at 5000`);
});