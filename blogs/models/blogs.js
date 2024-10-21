const mongoose  = require('mongoose');

let blogsSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            trim: true,
            required:true
        },

        author:{
            type: String,
            trim: true,
            required: true
        },

        comment:{

            type: String,
            trim: true
        }
    }
)


const blogs = mongoose.model('Blog',blogsSchema);
module.exports = blogs;