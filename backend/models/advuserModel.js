const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  category1:{
    type: String,
    required:true,
  },
  image1:{
    // data: Buffer,
    // contentType: String,
    type: String,
    required:true,
  },
  category2:{
    type: String,
    required:true,
  },
  image2:{
    // data: Buffer,
    // contentType: String,
    type: String,
    required:true,
  },
  category3:{
    type: String,
    required:true,
  },
  image3:{
    // data: Buffer,
    // contentType: String,
    type: String,
    required:true,
  }
})

// static signup method
userSchema.statics.asignup = async function(email,password,category1,image1,category2,image2,category3,image3) {

     // validation
  if (!email || !password || !category1 || !image1 || !category2 || !image2 || !category3 || !image3) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
     
    const advuser = await this.create({email,password:hash,category1,image1,category2,image2,category3,image3})
  
    return advuser
  }
// static login method
userSchema.statics.alogin = async function(email,password,category1,image1,category2,image2,category3,image3) {

    if (!email || !password || !category1 || !image1 || !category2 || !image2 || !category3 || !image3) {
        throw Error('All fields must be filled')
    }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
 
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
     if(user.category1!==category1 || user.category2!==category2 || user.category3!==category3)
     {
        throw Error('Incorrect Login')
     }
     if(user.image1!==image1 || user.image2!==image2 || user.image3!==image3)
     {
        throw Error('Incorrect Login')
     }

  return user;
}
module.exports = mongoose.model('Advanceuser', userSchema)