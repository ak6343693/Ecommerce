const multer=require('multer');
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary=require("./cloudinary");
const storage=new CloudinaryStorage({
    cloudinary, //authanctication k liye
    params:{
    folder:"Ecommerce_Project",
    allowed_format:["jpg","png","jpeg","gif"]
    }
})

const upload=multer({storage}); //upload yha pe middleware ka kaam krega jo kodu-cources name se foleder bnayega or file type check krega

module.exports=upload;