//we need to require mongoose here cause we will be making a mongoose model
//now we dont need to connect to database here as we will be requiring this file i.e in index.js
//where im already doing the connection

const mongoose = require('mongoose');
const {Schema} = mongoose;

//schema
const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true,
        min:0
    },
    //we could make this an array of categories
    //we'll assign each item a single category like fruit or veggies that sort of thing 
    //what we could also do is allow a special number of them
    category: {
        type:String,
        //just in case if we enter capitals in  category
        lowercase:true,
        enum:["fruit","vegetable","dairy"]
    },
    farm:{
        //
        type:Schema.Types.ObjectId,ref:'Farm'
    }

})
//then after our model we need to compile our model
//i.e defining our model our js class that represents data in our database
const Product = mongoose.model('Product', productSchema);

// now we need to export this model as so i can import and use it somewhere
//it'll be exported as an object

module.exports = Product;