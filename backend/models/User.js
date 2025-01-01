import mongoose from "mongoose";
const {schema} = mongoose;

const UserSchema = new mongoose.Schema({
    regno:{
        type:String,
        required:true,
        unique:true
    },

    firstname:{
        type:String,
        required:true,
        
    },
    lastname:{
        type:String,
        required:true,
      
    },
    grade:{
        type:String,
        required:true,
    },
    attendance:{
        type:Number,
        default:true,
    }
   
},{timestamps:true})

export default mongoose.model("User",UserSchema);