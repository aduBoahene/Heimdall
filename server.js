const express = require('express')
const app = express()
const PORT = process.env.port || 8899
const db = require("./models");

const bodyparser = require('body-parser')

//Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const UserRoute = require("./Router/User.Route");
const AppLinkRoute = require("./Router/AppLink.Route");

app.use("/api/user", UserRoute);
app.use("/api/appLink", AppLinkRoute);




//database connection
db.sequelize.sync().then(req =>{ 
    app.listen(PORT , ()=>{
        console.log(`App started on ${PORT}`)
    })
});

