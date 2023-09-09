require("dotenv").config();
const express =require("express");
const path= require("path");

const helmet = require('helmet');






// require("../src/db/conn");
const User= require("./models/usermessage")
const hbs =require("hbs");




const connectDB = require('../src/db/conn');




const app = express();
const port = process.env.PORT || 3000


//setting the path
const staticpath = path.join(__dirname,"../public")
const templatepath = path.join(__dirname,"../templates/views")
const partialpath = path.join(__dirname,"../templates/partials")

// console.log(( path.join(__dirname,"../public"))) 

//middleware
app.use(helmet());
app.use(express.urlencoded({extended:false}))
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));

//fixed error
// app.set("views",path.join(__dirname,"templates/views"))
// console.log(templatepath)
app.set("views",templatepath)
hbs.registerPartials(partialpath)



// app.set("views",path.join(__dirname,"templates/partials")) 
// app.set("views",partialpath)


app.set("view engine", "hbs")





//routing
app.get("/",(req,res)=>{
    res.render("index")
    // res.send("hello")
    // console.log(index)
    })
    
    // app.get("/contact",(req,res)=>{
    //     res.render("contact")
        
    //     // console.log(index)
    //     })



        app.post("/contact" ,async(req,res)=>{
            try{
// res.send(req.body)
const userData = new User(req.body)
await userData.save();
res.status(201).render("index")
            }catch{
                res.status(500).send(error)
            }

        })

     connectDB()
    
    //server create
    app.listen(port, ()=>{
        console.log(`server is running at port:"${port}`)
    })