const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Dogs = require("./Dogs")


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'walker'],
      default: 'owner',
    },
    dogs: [{ type: Schema.Types.ObjectId,
       ref: 'Dog' }], 
    address: {
      type: String,
      required: false,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true, // Include virtuals when document is converted to JSON
});

const User = model("User", userSchema);

module.exports = User;