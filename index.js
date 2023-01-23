 import express from "express"
 import cors from "cors"
 import mongoose from "mongoose"
import food from "./Schema.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect("mongodb+srv://cyntra:cyntra@cluster0.ph7jfgq.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected cynta")
})

//Routes post food item
app.post("/food", (req, res) => {
    const { Empname, Itemdesc, Price } = req.body
    
    const new_Date =new Date().toLocaleDateString();
    const user1 = new food({
        Empname, Itemdesc, Price, new_Date
    })
    user1.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ 'status': true, 'message': 'Success' });
        }
    })
})

//Routes  food item
app.get("/get/food", (req, res) => {

    food.find()
        .then(data => {
            res.send({ 'status': true, 'message': 'Success', 'data': data });
            // res.status(200).json({
            //     data
            // });
        })
        .catch(err => {
            console.log(err);
            // res.status(500).json({
            //     error: err
            // })
            res.send({ 'status': false, 'message': 'Something Went Wrong !', 'data': [] });
        })
})


app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})




app.listen(process.env.PORT || 3000, () => {

    console.log("BE started at port 9002")
})