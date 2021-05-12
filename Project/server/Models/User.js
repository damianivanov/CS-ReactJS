const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: uuidv4(),
    unique: true
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 512,
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  projects: {
    type: [String],
  },
  tasks: {
    type: [String],
  },
  role: {
     type: String,
     default: 'basic',
  },
  deleted:{
    type: Boolean,
    default: false
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