import mongoose from "mongoose"
import {  apiResponse } from "../constants.js"

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("MongoDB connected Succesfully")
        }).catch((err)=>{
            console.log(err)
            return apiResponse(400,false, "Error in connecting Mongodb database")
        })
    } catch (error) {
        console.log(error)
        return apiResponse(400,false, "Error in connecting to database")
    }
}

export default connection