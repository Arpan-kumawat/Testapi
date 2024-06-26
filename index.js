 import express from "express"
 import cors from "cors"
 import axios from "axios";
 import mongoose from "mongoose"
import food from "./Schema.js"
import { config } from 'dotenv';
config();


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


const port = 5000;



// mongoose.connect("mongodb+srv://cyntra:cyntra@cluster0.ph7jfgq.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB connected cynta")
// })

// //Routes post food item
// app.post("/food", (req, res) => {
//     const { Empname, Itemdesc, Price } = req.body
    
//     const new_Date =new Date().toLocaleDateString();
//     const user1 = new food({
//         Empname, Itemdesc, Price, new_Date
//     })
//     user1.save(err => {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send({ 'status': true, 'message': 'Success' });
//         }
//     })
// })

// //Routes  food item
// app.get("/get/food", (req, res) => {

//     food.find()
//         .then(data => {
//             res.send({ 'status': true, 'message': 'Success', 'data': data });
//             // res.status(200).json({
//             //     data
//             // });
//         })
//         .catch(err => {
//             console.log(err);
//             // res.status(500).json({
//             //     error: err
//             // })
//             res.send({ 'status': false, 'message': 'Something Went Wrong !', 'data': [] });
//         })
// })

app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching response:', error.response ? error.response.data : error.message);
    res.status(500).send(error.message);
  }
});


app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
