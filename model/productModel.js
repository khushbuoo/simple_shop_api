const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;


const db = require('../config/config').mongoUrl;

// Define our post schema
const productSchema = new Schema({
    title: {
        type: String,
      },
      price: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
});

module.exports = mongoose.model('Product', productSchema);
