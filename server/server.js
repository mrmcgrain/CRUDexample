
const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const port = 3002

app.use(express.json())  // creates the req.body
app.use(cors({
    origin: "http://localhost:5173",
}))


/// MODEL
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    todo: String
})

const Todo = mongoose.model("Todo", TodoSchema)



app.get("/test", (req, res) => {
    console.log("Test route hit")
    res.json({ msg: "TEST HIT" })
})

app.get("/api/getTodo", (req, res) => {
    console.log("GET ROUTE HIT")
    Todo.find()
        .then(found => {
            console.log("found", found)
            res.json(found)
        })
})

app.delete("/api/delete/:id", (req, res) => {
    console.log("req.params", req.params)
    Todo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            console.log("deleted", deleted)
            res.json({ msg: "deleted" + " " + req.params.id })
        })
})

app.post("/api/create", (req, res) => {
    console.log("req-body", req.body)

    Todo.create({ todo: req.body.todo })
        .then(created => {
            console.log("created", created)
        })
        .catch(err => console.log(err))

    res.json({ msg: "Todo created successfully" })

})




app.put("/api/edit/:id", (req, res) => {
    console.log("reqBody", req.body.edit, "reqParams", req.params)
    Todo.findById(req.params.id)
        .then(found => {
            console.log("found", found)
            found.todo = req.body.edit
            found.save()
        })
})




app.listen(port, () => {

    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to Database")
    })

    console.log("Server is up on port" + port)
})