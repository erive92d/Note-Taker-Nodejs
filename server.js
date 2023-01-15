const express = require("express")
const path = require("path")
const dataBase = require("./db/db.json")
const fs = require("fs")


const PORT = 3001;
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.get('/notes',(req,res)=> {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
})

app.post('/api/notes',(req,res)=> {
    console.log(req.body)
    if(req.body) {
        const {title,text} = req.body
        let newNotes = {
            title:title,
            text:text

        }

        //READ DATABASE FIRST
        fs.readFile("./db/db.json",'utf-8',(err,data) => {
            if(err) {
                console.log(err)
            } else {
                const jsonData = JSON.parse(data)
                jsonData.push(newNotes)

                fs.writeFile('./db/db.json',JSON.stringify(jsonData),err => {
                    err ? console.log(err) : console.log('Successfully updated Database')
                })
            }
        })
        res.status(201).json('Success')
    }
     else {
        res.status(500).json('Error')
     }
})
app.get('/api/notes',(req,res)=> {
    fs.readFile('./db/db.json','utf-8',(err,data) => {
        if(err) {
            console.log(err)
        } else {
            const jsonData = JSON.parse(data)
            res.json(jsonData)
        }
        
    })
})

app.listen(PORT, ()=> {
    console.log('LISTENING NOW')
})