const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const blogs = require('./models/blogs');
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/blogs')
.then( ()=>{
    console.log('db connected');
}).catch(()=>{
    console.log('db not connected');
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
// body parsing middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// task1 -> display all the blogs
app.get('/blogs',async(req,res)=>{
    let allblogs = await blogs.find({});
    res.render('index',{allblogs});
})

// show form
app.get('/blogs/new',(req,res)=>{
    res.render('new');
})

// ADD blogs
app.post('/blogs',async(req,res)=>{
    let {title ,auhtor, comment} = req.body;
    let newBlog = blogs.create({title ,auhtor, comment});
    res.redirect('/blogs');
})

// show a particular blog
app.get('/blogs/:id', async(res,req)=>{
    let {id} = req.params;
    let foundproduct = await blogs.findById(id);
    res.render('show',{foundproduct});
})

//edit
app.get('/blogs/:idd/edit' , async(req,res)=>{
    let {idd} = req.params;
    let foundProduct =  await blogs.findById(idd);
    res.render('edit' , {foundProduct});
})

//update a blog
app.patch('/blogs/:id' , async(req,res)=>{
    let {id} =  req.params;
    // console.log(req.params.id);
    let {comment} = req.body;
    // console.log(req.body.comment)
    await blogs.findByIdAndUpdate(id , {comment});
    res.redirect('/Blogs')
})

// deleting
app.delete('/blogs/:id' , async(req,res)=>{
    let {id} =  req.params;
    await blogs.findByIdAndDelete(id);
    res.redirect('/blogs')
})

app.listen(8080, ()=>{
    console.log("server is connected to the port 8080");
});