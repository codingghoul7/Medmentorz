const { error } = require("jquery");
const mongoose = require("mongoose");
const  validator = require("validator");
const uniqueValidator = require('mongoose-unique-validator');
const sanitizeHtml = require('sanitize-html');

const dirtyHtml = '<script>alert("XSS")</script><p>Safe content</p>';
const cleanHtml = sanitizeHtml(dirtyHtml);

console.log('Sanitized HTML:', cleanHtml);



const userSchema = mongoose.Schema({
   
email:{
type:String,
required:true,

validate(value){
    if(!validator.isEmail(value)){
        throw new Error("Invalid emailid")
        console.log(error)
    }
}

    },

name:{
    type:String,
    required:true, 
    minLength:3,
   maxLength:20
    },

 phone:{
          type:Number,
          required:true, 
          minLength:10
          
            },
            telegramid:{
                type:String,
                unique: true,
                validate: {
                    validator: function(value) {
                      // Check if the string matches the format of a Telegram ID
                      return /^[0-9]+(_[0-9]+)*$/.test(value);
                    },
                    message: 'Telegram ID must be in the correct format.'
                  }
                },

})
userSchema.plugin(uniqueValidator, { telegramid: 'Telegram ID must be unique.' });

// we need to create a collection

const User=mongoose.model("User",userSchema);

module.exports= User;