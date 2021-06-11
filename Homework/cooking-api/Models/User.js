const mongoose = require('mongoose');
//const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 512,
  },
  gender:{
    type: Number,
    required: true,
  },
  recipes: {
    type: [String],
  },
  role: {
    type: String,
    default: 'user',
  },
  status: {
    type: String,
    default: 'active',
    required:true
  },
  bio:{
    type: String,
    min: 0,
    max: 512
  },
  photo:{
    type: String,
    required:true
  }
},
  {
    timestamps: true,
  })

userSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;