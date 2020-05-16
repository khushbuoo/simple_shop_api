const fs = require('fs');
const path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');
const db = require('../../../config/config').mongoUrl;


const Usermodel = require('./../../../model/userModel')
const OrederModel = require('../../../model/orderModel')
const {
    save,
    get,
    update,
    getUsersMainProfileData,
    emailVerification,
    emailConfirmation,
    getUsersProfileData,
    updateProfile,
    AddShipindaddress,
    updateUserKycDetails,
    uploadKycProofs,
    getUsersKycData,
    getUsersOrderData,
    } = require('../../../dbservice/v1/user');

  const {
    fetchproduct,
    saveorder,
  } = require('../../../dbservice/v1/admin');

  const {
  handleResponse,
  handleError,
} = require('../../../common/utils/middlewares/requestHandlers');
const appSecret = require('../../../config/config').appSecret;

const generateJwtToken = async (user) => {
  const token = await jwt.sign(user._doc || user, appSecret, {});
  return token;
};
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);


  module.exports.register = async ({ body }, res) => {
    try {
      const {
     firstName, lastName, email,password,
      } = body;

      const existingUserEmail = await get(email, 'email');
      // if (existingUserEmail && existingUserEmail.isEmailVerified === true) {
      if (existingUserEmail) {
        return handleResponse({ res,statusCode:400,msg:'User Already exists. Please try another one!' });
      }
      let user;
        if (!firstName || !lastName || !email || !password) {
          return handleResponse({ res,statusCode:404,msg:'Required Params Missing' });
        }
        user = await save(body);
        await emailVerification(user._id, email);
      return handleResponse({ res,msg:' User Registered Successfully. Please verify your email.', data: user });
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.login = async ({
    body: {
      email,
      password,
    },
  },
    res,
  ) => {
    try {
        if (!email || !password) {
          return handleResponse({ res,statusCode:404,msg:'Required Params Missing' });
        }
        const user = await get(email, 'email');
        // console.log('hyy',user)
      if (!user) {
        return handleResponse({ res,statusCode:403,msg:'Username Or Password Is Incorrect' });
      }
      if(user.role !== 'USER'){
        throw 'user is not exits';
          console.log('please check login')
      }
        if (!(await user.verifyPassword(password))) {
          return handleResponse({ res,statusCode:403,msg:' Password Is Incorrect' });
        }
      // console.log('nnn',user._doc)
      delete user._doc.password;
      const withoutToken = { ...user._doc };
      delete withoutToken.token
      const newToken = await generateJwtToken(withoutToken);
      const updatedata =  await Usermodel.findByIdAndUpdate(
        {
          _id:user._id
        },
        {
          $set:
          {
            token:newToken,
          }},
        {
          upsert: true
        })
      const updatedUserData = await getUsersMainProfileData(user._id);
      handleResponse({ res,msg:'Login Successfully',data: updatedUserData });
    } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (!email) throw 'Invalid Request';
      let user;
      if (email) user = await get(email, 'email');
      if (user) {
        const otpCode = await Math.floor(100000 + Math.random() * 900000);
      const updatedata =  await Usermodel.findByIdAndUpdate(
        {
          _id:user._id
        },
        {
          $set:
          {
            code:otpCode,
            codeExpiry:Date.now() + 3600000
          }},
        {
          upsert: true
        })
        if(updatedata){
          transporter.sendMail({
            to:'khushbu@solulab.co',
            from: 'khushbumochi990@gmail.com',
            subject: 'your otp code',
            html: `
              <p> Your Otp is: ${otpCode} </p>`
          });
          handleResponse({ res, data: 'Otp Send Successfully' });
        }else{
          throw err;
        }
      }else{
        throw err;
      }
         }
     catch (error) {
      return handleError({ res, err: error });
    }
  };
  module.exports.resetPassword = async (
    { body: { newPassword, userId } },
    res,
  ) => {
    try {
      if (!userId || !newPassword) throw 'Invalid Request';
      let user = await get(userId);
      if (!user) throw 'User not exist';
      const updatedata =  await Usermodel.findByIdAndUpdate(
        {
          _id:user._id
        },
        {
          $set:
          {
            password: await user.encryptPassword(newPassword)
          }
        },
        {
          upsert: true
        })
      if (updatedata) {
       await transporter.sendMail({
          to: 'khushbukhushi112@gmail.com',
          from: 'khushbumochi990@gmail.com',
          subject: 'your Password reseat',
          html: `
            <p> your Password reseat Successfully </p>`
        });
        return handleResponse({ res, data: 'Password successfully updated' });
      }
      throw 'Request Failed';
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.changePassword = async (
    { body: { newPassword, oldPassword }, user: { _id: userId } },
    res,
  ) => {
    // console.log('heyd',userId)
    try {
      let result;
      if (!userId || !oldPassword || !newPassword) throw 'InvalId Request';
      const user = await get(userId);
      if (!user) throw 'User not exist';
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (passwordMatch) {
        result = await Usermodel.findByIdAndUpdate(
          {
            _id:user._id
          },
          {
            $set:
            {
              password: await user.encryptPassword(newPassword)
            }
          },
          {
            upsert: true
          })
      } else {
        throw ' The old password you have entered is incorrect. ';
      }
      if (result) {
        await transporter.sendMail({
          to: 'khushbu@solulab.co',
          from: 'khushbumochi990@gmail.com',
          subject: 'change passwrd',
          html: `
            <p> Your Password changed Successfully </p>`
        });
        return handleResponse({ res, data: 'Password successfully Changed' });
      }
      throw 'Request Failed';
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.verifyOtp = async ({ body: { otp, userId } }, res) => {
    try {
      const user = await get(userId, '_id');
      if (user === null) throw 'User not found';
      if (user.code !== otp) throw 'Verification code is incorrect';
      const dt = new Date();
      if (dt > user.codeExpiry) {
        handleResponse({
          res,
          statusCode: 302,
          msg:
            'Verification code has been expired please tap on Resend button to get a new one',
        });
      } else {
        const result =  await Usermodel.findByIdAndUpdate({_id:user._id},
          {$set:{isOtpVerified:true}},
          {upsert: true})
          const updatedUserData = await getUsersMainProfileData(user.id);
        handleResponse({
          res,
          msg: 'Verification code verified successfully',
        });
      }
    } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.resendOtp = async ({ body: {  email } }, res) => {
    try {
      let user;
      let otpCode;
      if (email) user = await get(email, 'email');
      if (!user) {
        throw 'Invalid user credentials';
      } else {
        otpCode = await Math.floor(100000 + Math.random() * 900000);
        const msg = `As per your request, the newly generated OTP is ${otpCode}.`;
        const result =  await Usermodel.findByIdAndUpdate({_id:user._id},
          {$set:{code:otpCode,codeExpiry:Date.now() + 3600000}},
          {upsert: true})
          if(result){
            await  transporter.sendMail({
               to: 'khushbu@solulab.co',
               from: 'khushbumochi990@gmail.com',
               subject: 'your Resend otp code',
               html: `
                 <p> ${ msg } </p>`
             });
             handleResponse({ res, data:'Otp Resend Successfully' });
           }
      }
      } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.emailConfirmation = async (
    { query: { userId, emailVerificationToken } },
    res,
  ) => {
    try {
      const confirmation = await emailConfirmation(
        userId,
        emailVerificationToken,
      );
      if (confirmation.result === true) {
        handleResponse({
          res,
          statusCode: 200,
          msg: 'Your Email Verified Successfully',
        });
       }
     } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.getsingleUser = async ({ query: { userId} },
    res,
  ) => {
    try {
      const user = await getUsersMainProfileData(userId);
      handleResponse({ res, data: user });
    } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.getUser = async (req,res,next) => {
    try {
      const user = await getUsersProfileData();
      handleResponse({
        res,
        statusCode: 200,
        msg: 'Your fetch data successully',
        data:user,
      });
      } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.updateProfiles = async ({ params: { profileId }, body }, res) => {
    try {
      const user = await updateProfile(profileId, body);
      // console.log('update user is ',user)
      return handleResponse({ res, data: user });
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.emailVerification = async (
    { body: { email }, user: { _id: userId } },
    res,
  ) => {
    try {
      const confirmation = await emailVerification(userId, email);
      console.log('hey conformation is',confirmation)
      if (confirmation === true) {
        handleResponse({
          res,
          statusCode: 200,
          msg: 'Your Email Verification Token Generated Successfully.',
        });
        // res.redirect(frontUrl + '/verified');
      } else {
        throw 'Failed To Generate Email Verification Token.';
        // res.redirect(frontUrl + '/not-verified');
      }
    } catch (err) {
      handleError({ res, err });
    }
  };
   module.exports.add_shipining_address = async ({ user: { _id: userId }, body:{houseNo,street,country,city,state,pincode} }, res) => {
    try {
      // let results;
      const confirmation = await AddShipindaddress(userId,houseNo,street,country,city,state,pincode);
      if (confirmation.result === true){
        handleResponse({
          res,
          msg: 'Address is added sucessfully',
        });
      }else{
        throw 'Request Failed';
      }
    } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.uploadKycDetails = async (req, res)  => {
    try {
            let uploadDetails = {
              "userKyc.address": req.body.address,
              "userKyc.country": req.body.country,
              "userKyc.state": req.body.state,
              "userKyc.city": req.body.city,
              "userKyc.dateOfBirth": req.body.dob,
              "userKyc.kycStatus":'pending',
          };
          var condition = {
            _id: req.user._id
        }
        let response = await Model.updateOne(condition,uploadDetails);
        if (updateUserKyc) {
          return  handleResponse({
            res,
            msg: 'Kyc document  added sucessfully',
          });
        } else {
          throw 'Request Failed';
        }
    } catch (err) {
    }
  }
  module.exports.uploadKycProofData = async (req, res)  => {
    try {

      var condition = {
        _id: req.user._id
    }
        let uploadDetails = {
            "idType": req.body.documentType,
            "document.documentPath": req.files.documentImage[0].path,
            "holdingDocumentUrl.documentPath": req.files.holdingDocument[0].path,
            "userKyc.kycStatus":'pending',
        }
        console.log('uploaddetails',uploadDetails)
        let updateKycDocument = await uploadKycProofs(condition, uploadDetails);
        if (updateKycDocument) {
          return  handleResponse({
            res,
            msg: 'Kyc proof document  added sucessfully',
          });
        } else {
          throw 'Request Failed';
        }
    }
    catch (err) {
      handleError({ res, err });
    }
}
module.exports.fetchuploadKycProofData = async ({ query: { userId} },
  res,
) => {
  // console.log('vv',userId)
  try {
    const user = await getUsersKycData(userId);
    handleResponse({ res,msg:'KYC Status Displayed successfully', data: user });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.showproduct = async (req,res,next) => {
  try {
    const user = await fetchproduct();
    handleResponse({
      res,
      statusCode: 200,
      msg: 'Your fetch data successully',
      data:user,
    });
    } catch (err) {
    handleError({ res, err });
  }
};
module.exports.productorder = async (req, res) => {
  try {
      let orderDetails = {
        "product": req.body.product,
        "quantity": req.body.quantity,
        "userId":req.user,
      };
    order = await saveorder(orderDetails);
     user  = await Usermodel.findById(req.user._id)
     user.order.push(order);
     console.log('user is teeatttttttttttt',user)
      await save(user)
    console.log('hey is product is',orderDetails)
    handleResponse({ res,msg:'Ordere addded Successfully', data: order });

  } catch (err) {
    return handleError({ res, err });
  }
};
module.exports.getOrder = async ({ query: { userId} },res,next) => {
  try {
    const user = await OrederModel.find({userId:userId})
                                  .select('quantity _id')
                                  .populate('userId','shippingAddress firstName')
                                  .populate('product','title price')
    handleResponse({
      res,
      statusCode: 200,
      msg: ' Order List Displayed Successfully,',
      data:user,
    });
    } catch (err) {
    handleError({ res, err });
  }
};

module.exports.getOrderDetails = async (req,res,next) => {
  try {
    const orderId = req.params.orderId
    const user = await OrederModel.find({
      $and: [
        {userId: req.userData._id},
        {_id: orderId}
      ]
    }).select('quantity _id')
    .populate('userId','shippingAddress firstName')
    .populate('product','title price')
    handleResponse({
      res,
      statusCode: 200,
      msg: ' Order List Displayed Successfully,',
      data:user,
    });
    } catch (err) {
    handleError({ res, err });
  }
};
module.exports.cancleorder = async (req, res) => {
  try {
    const orderId = req.params.orderId
    const order = await OrederModel.findOneAndRemove({_id: orderId})
    user  = await Usermodel.findById(req.user._id)
    user.order.pop(orderId);
          await save(user).then(result=>{
            handleResponse({
              res,
              statusCode: 200,
              msg: 'Order cancle successfully'
            });
          }).catch
    } catch (err) {
    handleError({ res, err });
  }
};




