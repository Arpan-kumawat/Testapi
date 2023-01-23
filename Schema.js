
import mongoose from "mongoose"

const userSchema2 = new mongoose.Schema({
    Empname:String , Itemdesc:String , Price:String  , new_Date:String
})
const food = new mongoose.model("food", userSchema2)


export default  food;