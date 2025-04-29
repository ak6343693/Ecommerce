const mongoose=require("mongoose");
//use method which is used to create schema is known as schema method

//collection me type define krne k liye schema use krte h
const productSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
    discount:{type:String,required:true},
    productImage:{type:String,required:true},
})
const Product=mongoose.model('products',productSchema);
module.exports=Product;