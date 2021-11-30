//our 2nd -> farm model defined here
const mongoose = require('mongoose');
const Product = require('./product');
const {Schema} = mongoose;

const farmSchema = new Schema({
    name:{
        type: String,
        required: [true,'Farm must have a name!']
    },
    city:{
        type:String
    },
    email:{
        type:String,
        required:[true,'Email Required']
    },
    products:[
        //inside of this object each element is an object
        {
            //this type not available directly
            type:Schema.Types.ObjectId,
            //referencing to our product model
            ref:'Product'
        }
    ]
    
})
// //mongoose middleware runs before something and we dont next() here
// farmSchema.pre('findOneAndDelete',async function(data){
//     console.log("pre");
//     console.log(data);
// })
//in post we will have access to the data that is deleted and in pre(data) we wouldn't have it'll be just anonymous function
//as its running before the query
farmSchema.post('findOneAndDelete',async function(farm){
    //if not an empty array we'll delete its contents
    if(farm.products.length){
        // so select all products where their -id is in the products array of the farm that we just deleted($in an operator)
     const res = await Product.deleteMany({_id:{$in: farm.products}})

    }
})


const Farm = mongoose.model('Farm', farmSchema);
module.exports=Farm;