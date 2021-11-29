//a full-crud application 
//just take the basic code required and shove it into your index,js
//but this index.js file should be pretty small
// no routes
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//requiring our model
const Product = require('./models/product.js');
const Farm = require('./models/farm');
const categories =['fruit','vegetable','dairy'];

// database is named farmStand where our collections will be stored and will be created for us
mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log("Mongo connected")
    })
    .catch(err =>{
        console.log("oh fuck error");
        console.log(err);
    })
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//farm routes

//index page
app.get('/farms',async(req,res)=>{
    const farms= await Farm.find({});
    res.render('farms/index',{ farms })
})

app.get('/farms/new',(req,res)=>{
    res.render('farms/new');
})
app.post('/farms',async(req,res)=>{
    //async handler because we are going to be making a new model
    //instantiating a model,saving it thats asynchronous with mongoose
   const farm = new Farm(req.body);
   await farm.save();
   res.redirect('/farms')

})
//details page(show page)
app.get('/farms/:id',async(req,res)=>{
    const farm=await Farm.findById(req.params.id);
    res.render('farms/show',{farm});
})




//product routes



//this going to make a little page that we respond with,that contains information about all the products
//maybe a table of products ,maybe a list of them
app.get('/products',async (req,res)=>{
//were looking for query string for to filter by category
        const {category} =req.query;
        // id we have req.query then we are going to use that to find products then
         //its okay otherwise we,ll find all products and display them 
        if(category){
            //if there is category in the query string then we,ll find products using that query string
            const products = await Product.find({category});
                // our template goes in here
        //now lets pass through all the products that we found, thats second argument we pass to render
        res.render('products/index', {products,category});
        }else{
        //we'll begin by querying our product model and to get all products
            //find everything
            const products = await Product.find({});
              // our template goes in here
        //now lets pass through all the products that we found, thats second argument we pass to render
        
        res.render('products/index', {products, category : 'All'});
        }
    
  
})
// for creating new products
//1- this route shall serve the form
//2-app.post to /products shall submit our form and actually should create a new product
app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})
//2- route where we submit our new form data
app.post('/products',async (req,res)=>{
     //when we have post request and we want information back from the post request body
     //we dont have access to req.body (we have but its just undefined)
     //we need to express to use that middleware
     //using that submitted data we are gonna make new product
    const  newProduct = new Product(req.body);
    // saving our data to mongodb and that takes time so we need to await that
    console.log(newProduct);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

//show route
app.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
   const product=await Product.findById(id);
   //now rendering a template
   //we'll pass in the product that we found 
   res.render("products/show", {product})
});

//update route
app.get('/products/:id/edit',async (req,res)=>{
    const {id}=req.params;
    //first we'll lookup the form before we actually render a form
    //looking  for products by id
    const product = await Product.findById(id);
    res.render('products/edit',{product,categories}); 
})
//update data submission
app.put('/products/:id',async(req,res)=>{
    const {id} =req.params;
    const product = await Product.findByIdAndUpdate(id, req.body , {runValidators: true, new:true});
   res.redirect(`/products/${product._id}`);
   //we could have directly accessed id here instead of product._id,but product._id will only when actually successfully
   // get our data back after awaiting our query object  which is thenable 
})
//delete route
//we'll use an async function cause it does take time to delete
app.delete('/products/:id',async (req,res)=>{
    const {id} =req.params;
    //then we'll remove that product from our database using that id
    const deletedProduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(3000,() =>{
    console.log("App is listening on port 3000")
})
