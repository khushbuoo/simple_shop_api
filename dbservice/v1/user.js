const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;
const Model = require('../../model/userModel');
const OrderModel= require('../../model/orderModel')
const nodemailer = require('nodemailer');
const request = require('request');
var sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);


module.exports.save = (data) => new Model(data).save();

module.exports.get = async (idOrEmail, fieldName = '_id') => {
    // console.log('zzz',idOrEmail);
    // console.log('yyy',idOrEmail);
  const data = await Model.findOne({
    [fieldName]: `${idOrEmail}`,
  });
  return data;
};

module.exports.getUserData = async (userdata, fieldName) => {
  const data = await Model.find({
    [fieldName]: { $in: userdata },
  });
  return data;
};

module.exports.isUserExists = (idOrEmail, fieldName = '_id') => Model.countDocuments({
  [fieldName]: idOrEmail,
});

module.exports.getUsersMainProfileData = async (userId) => {
  try {
    const userData = await Model.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    // console.log('userdata is',userData)
    return userData[0];
  } catch (error) {
    throw error;
  }
};
module.exports.emailVerification = async (userId, email, userLastName, userFirstName) => {
  try {
    if (email) {
      const user = await this.get(userId, '_id');
      // console.log('ccc',user)

      const emailVerificationToken = Math.random()
        .toString(36)
        .substr(2);
      const lastName = user.lastName === undefined ? userLastName : user.lastName;
      const firstName = user.firstName === '' ? userFirstName : user.firstName;
      if (user.email === email || user.email === undefined) {
        if (user.isEmailVerified === false) {
         await transporter.sendMail({
            to: 'khushbu@solulab.co',
            from: 'khushbumochi990@gmail.com',
            firstName,
            lastName,
            subject: 'Mail Verification',
            html: `
              <p> your email verify token  ${emailVerificationToken} </p>`
          });
          await Model.findByIdAndUpdate({
            _id:user._id
          },
            {
              $set:
              {
                emailVerificationToken:emailVerificationToken,
                emailExpiry:Date.now() + 3600000
              }
            },
            {
              upsert: true
            });
            return true;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
module.exports.emailConfirmation = async (userId, emailVerificationToken) => {
  try {
    const user = await this.get(userId, '_id');
    const dt = new Date();
    if (user) {
      if (user.emailVerificationToken === emailVerificationToken) {
        // console.log('result is true')
        await Model.findByIdAndUpdate(
          {
            _id:user._id
          },
          {
            $set:{
              isEmailVerified:true
            }},
          {
            upsert: true
          }
          );
        user.result = true;
        return user;
      }else{
        console.log('not found')
      }
    }
    user.result = false;
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports.getUsersProfileData = async () => {
  try {
    const userData = await Model.aggregate([
      {
        $project: {
          password: 0,
        },
      },
    ]);
    console.log('userdata is',userData)
    return userData;
  } catch (error) {
    throw error;
  }
};
module.exports.updateProfile = async (profileId, body)=>{
 try{
  const {
    firstName, lastName, email,password,
     } = body;
  const data = await Model.findByIdAndUpdate(
    profileId,
    {
      $set: {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      },
    },
    {
      runValidators: true,
      new: true,
    },
  );
  return data;
 }catch(error){
   throw error;
 }
}

module.exports.AddShipindaddress = async (
  userId,
  houseNo,
    street,
    country,
    city,
    state,
    pincode
) => {
  try {
    if (!houseNo || !street || !country || !city || !state || !pincode) throw 'InvalId Request';
      const user = await this.get(userId);
      if (!user) throw 'User not exist';
    await Model.findByIdAndUpdate({
      _id:user._id
    },
    { $push:
       {"shippingAddress": {
        houseNo:houseNo,
        street:street,
        country:country,
        city:city,
        state:state,
        pincode:pincode
      }}
      },
      {
        upsert: true
      })
      user.result = true;
      return user; 
     } catch (error) {
    throw error;
  }
};

module.exports.updateUserKycDetails = async (condition,uploadDetails) => {
  try {
    console.log('hyyy',condition)
    console.log('hyyy',uploadDetails)
    let response = await Model.updateOne(condition,uploadDetails);
    if(response.nModified || response.ok ){
      return true;
   }else {
       return false;
   }
  } catch (error) {
    throw error;
  }
};
module.exports.uploadKycProofs = async(condition, uploadDetails)=>{
  let response = await Model.updateOne(condition,{$push :{
      'userKyc.kycDocuments':uploadDetails}});
  if(response.nModified || response.ok ){
     return true;
  }else {
      return false;
  }
}
module.exports.getUsersKycData = async (userId) => {
  try {
    const userData = await Model.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $project: {
          userKyc: {
            kycDocuments:{
              idType:1
            },
            kycStatus:1
          }
        },
      },
    ]);
    // console.log('userdata is',userData)
    return userData[0];
  } catch (error) {
    throw error;
  }
};

module.exports.getUsersOrderData= async () => {
  try {
    const userData = await OrderModel.aggregate([
      {
        $project: {
          "quantity":1,
          "product":{
            title:1,
            price:1
          }
        },
      },
    ]);
    console.log('userdata is',userData)
    return userData;
  } catch (error) {
    throw error;
  }
};







