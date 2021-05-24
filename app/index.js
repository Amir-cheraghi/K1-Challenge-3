const dotenv = require('dotenv').config({path : process.cwd()+'/config.env'})
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const mongoStore  = require('connect-mongo')
const chalk = require('chalk')

const homeRoute = require('./../app/routes/homeRoute')
const apiRoute = require('./../app/routes/apiRoute')

module.exports =  class application{
    constructor(){
        this.setMongo()
        this.setConfig()
        this.setRoute()
        this.setExpress()
    }

    async setMongo(){
        await mongoose.connect(process.env.DB_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(chalk.bgCyan.black('Connected To DB'))
    }

    setConfig(){
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(session({
            secret : process.env.SESSION_SECRET,
            resave : true,
            saveUninitialized : false,
            cookie : {maxAge : 2 * 24 * 60 * 60 * 1000 , httpOnly:true , },
            store : new mongoStore({mongoUrl : process.env.DB_URl})
        }))
        app.use(express.static(process.cwd()+'/src/public'))
        app.set('view engine' , 'ejs')
        app.set('views' , process.cwd()+'/src/views')
    }

    setRoute(){
        app.use('/' , homeRoute)
        app.use('/api' ,apiRoute )
    }

    setExpress(){
        app.listen(process.env.SERVER_PORT || 3000 , '127.0.0.1' , ()=>{
            console.log(chalk.bgCyan.black(new Date() + `\nServer Is Running In Port ${process.env.SERVER_PORT} ...`))
        })
    }

}