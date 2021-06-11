const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { required } = require('joi');

const userSchema = new mongoose.Schema({
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
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  role: {
    type: String,
    default: 'basic',
  },
  deleted: {
    type: Boolean,
    default: false
  },
  gender:{
    type: Number,
    required: true,
  },
  photo:{
    type:String
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

userSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}
userSchema.set('autoIndex', true)
const User = mongoose.model('User', userSchema);

module.exports = User;