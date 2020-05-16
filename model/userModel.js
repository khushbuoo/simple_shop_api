const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

var bcrypt = require('bcryptjs');


// Define our user schema
const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    // required: true,
    minlength: 8,
    validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  },
  code: {
    type:String
  },
  codeExpiry:{
    type:String
  },
  isOtpVerified: { type: Boolean, default: false },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  token: { type: String },
  role:{
    type:String,
    default: 'USER',
  },
  // productId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Product',
  //   // required: true
  // },
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  // kycStatus: {
  //   type: String,
  //   enum: ['notSubmitted ', 'approved', 'rejected', 'pending'],
  //   default: 'notSubmitted ',
  // },
shippingAddress: [
  {
    houseNo: {
      type: String,
      default:''
    },
    street: {
      type: String
    },
    country: {
      type: String,
      default:''
    },
    city: {
      type: String,
      default:''
    },
    state: {
      type: String,
      default:''
    },
    pincode: {
      type: String,
      default:''
    },
  }
],
userKyc: {
  address: String,
  country: String,
  state: String,
  city: String,
  dateOfBirth: Date,
  kycDocuments: [{
      idType: String,
      document: {
          documentPath: String,
      },
      holdingDocumentUrl: {
          documentPath: String,
      },
  }],
  kycStatus: {
    type: String,
    enum: ['notSubmitted ', 'approved', 'rejected', 'pending'],
    default: 'notSubmitted ',
  },
},
});
UserSchema.pre('save', async function preSave(cb) {
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    cb();
  } catch (error) {
    cb(error);
  }
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
};

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = User = mongoose.model('users',UserSchema);
