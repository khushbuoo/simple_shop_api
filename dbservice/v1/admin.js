const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;
const UserModel = require('../../model/userModel');
const ProductModel = require('../../model/productModel');
const OrderModel = require('../../model/orderModel');
const nodemailer = require('nodemailer');
const request = require('request');
const getUsersMainProfileData = require('../../dbservice/v1/user')
var sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);


module.exports.saveproduct = (data) => new ProductModel(data).save();

module.exports.getproducts = async (idOrEmail, fieldName = '_id') => {
  const data = await Model.findOne({
    [fieldName]: `${idOrEmail}`,
  });
  return data;
};

module.exports.fetchproduct = async () => {
  try {
    const userData = await ProductModel.find({})
    console.log('userdata is',userData)
    return userData;
  } catch (error) {
    throw error;
  }
};

module.exports.saveorder = (data) => new OrderModel(data).save();
module.exports.productupdate = async(req, productId)=>{
  try{
    const title = req.body.title;
  const price  = req.body.price;
  const imageUrl = req.files.imageUrl[0].path;
  const updatedata = await ProductModel.findByIdAndUpdate(
          {_id:productId},
          {
            $set: {
              title:title,
              price:price,
              imageUrl:imageUrl
            },
          },
          {
           upsert: true
          },
        );
        return updatedata;

  }catch(err){
    throw err;
  }
};
module.exports.getUsersOrderData= async () => {
  try {
    const userData = await OrderModel.aggregate([
      {
        $project: {
          "quantity":1,
          "product":1,
          "userId":1
        },
      },
    ])
    console.log('userdata is',userData)
    return userData;
  } catch (error) {
    throw error;
  }
};
module.exports.getUserlist = async () => {
  try {
    const userData = await UserModel.aggregate([
      {
        $project: {
          password: 0,
          token:0,
          emailVerificationToken:0
        },
      },
    ]);
    console.log('userdata is',userData)
    return userData;
  } catch (error) {
    throw error;
  }
};
module.exports.viewsingleUser = async (userId) => {
  try {
    const userData = await UserModel.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $project: {
          password: 0,
          token:0,
          emailVerificationToken:0
        },
      },
    ]);
    // console.log('userdata is',userData)
    return userData[0];
  } catch (error) {
    throw error;
  }
};

module.exports.getUsersKyclist = async () => {
  try {
    const userData = await UserModel.aggregate([
      {
        $project: {
          firstName:1,
          lastName:1,
          userKyc: 1,
          kycStatus:1
        },
      },
    ]);
    // console.log('userdata is',userData)
    return userData;
  } catch (error) {
    throw error;
  }
};
module.exports.fetchKycDetail = async (userId) => {
  try {
    const userData = await UserModel.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $project: {
          firstName:1,
          lastName:1,
          userKyc: 1,
          kycStatus:1
        },
      },
    ]);
    // console.log('userdata is',userData)
    return userData[0];
  } catch (error) {
    throw error;
  }
};
exports.userKycVerify = async (req,res) => {
  try {
      const userId = req.params.userId;
      const user = await UserModel.findById({_id:userId})

    var uploadDetails = {
        "userKyc.kycStatus":req.body.kycStatus,
    };
    var conditions = {
        _id: userId,
        role: 'USER'
    }
    const status = req.body.kycStatus;
    let response = await UserModel.updateOne(conditions,uploadDetails)
    if(response.nModified || response.ok ){
      await transporter.sendMail({
        to: 'khushbu@solulab.co',
        from: 'khushbumochi990@gmail.com',
        subject: 'kyc Status',
        html: `
          <p> your Kyc Status is :${status} </p>`
      });
   }else {
       return false;
   }
  } catch (error) {
    throw error;
  }
}