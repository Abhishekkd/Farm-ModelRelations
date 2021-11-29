//our 2nd -> farm model defined here
const mongoose = require('mongoose');
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

const Farm = mongoose.model('Farm', farmSchema);
module.exports=Farm;