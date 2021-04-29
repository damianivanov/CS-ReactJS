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
    max: 1024,
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  projects: {
    type: [String],
    required: false
  },
  tasks: {
    type: [String],
    required: false
  }
},
  {
    timestamps: true,
  })

userSchema.pre('save', async function (next) {
  try {
    /* 
    Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false,
     and we only want to hash the password if its a new document, else it will again hash the password 
     if you save the document again by making some changes in other fields incase your document contains other fields.
    */
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
module.exports = User