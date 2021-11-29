//to seed our database with some initial data
//we can run this file individually without he help of any express or server or anything
const mongoose = require('mongoose');
const Product = require('./models/product.js');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log("MOngo connected")
    })
    .catch(err =>{
        console.log("oh fuck error");
        console.log(err);
    })

    // const p = new Product({
    //     name:'Ruby GrapeFruit',
    //     price:1.99,
    //     category:'fruit'

    // })
    // p.save()
    // .then(p=>{
    //     console.log(p)
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    //all above is done being saved to our database called farmStand under products collection
    // now to make couple more products we could just do the same
    //what we can also do is use insertMany()
    //where we have to specify an array of products u wanna insert

    const seedProducts = [
        {
            name: 'Fairy Eggplant',
            price: 1.00,
            category: 'vegetable'
        },
        {
            name: 'Organic Goddess Melon',
            price: 4.99,
            category: 'fruit'
        },
        {
            name: 'Organic Mini Seedless Watermelon',
            price: 3.99,
            category: 'fruit'
        },
        {
            name: 'Organic Celery',
            price: 1.50,
            category: 'vegetable'
        },
        {
            name: 'Chocolate Whole Milk',
            price: 2.69,
            category: 'dairy'
        },
    ]
    
    Product.insertMany(seedProducts)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })