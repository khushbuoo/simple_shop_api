const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;


const db = require('../config/config').mongoUrl;

// Define our post schema
const orederSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
         ref: 'Product',
      },
      quantity: {
        type: Number,
        default:1,
      },
       userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
});

module.exports = mongoose.model('Order', orederSchema);
