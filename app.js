const app=require("express")();
const fileUpload=require("express-fileupload");
const bodyparser=require("body-parser");
const mongoose=require('mongoose');
const cors=require("cors");
require('dotenv').config();

const login=require("./auth/login");
const register=require("./auth/register");
const getEmails=require("./options/getEmails");
const sendEmail=require("./options/sendEmail");

mongoose.connect('mongodb+srv://kerengold55:Nina0208%40@cluster0.tiee3.mongodb.net/users?retryWrites=true&w=majority');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(fileUpload());

app.post("/login",(req,res)=>{
    if(req.body)
        login(req,res);
    else
        res.send({status: 400, msg:"Request failed!"});
});

app.post("/register",(req,res)=>{
    if(req.body)
        register(req,res);
    else
        res.send({status: 400, msg:"Request failed!"});
});

app.post("/getemails",(req,res)=>{
    getEmails(req,res);
})

app.post("/sendemail",(req,res)=>{
    if(req.body)
        sendEmail(req,res);
    else
        res.send({status: 400, msg:"Request failed!"});
})

app.listen(process.env.PORT);