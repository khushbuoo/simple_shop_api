const fs = require('fs');
const path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');
const db = require('../../../config/config').mongoUrl;
const Usermodel = require('../../../model/userModel')
const Productmodel = require('../../../model/productModel')
const OrderModel = require('../../../model/orderModel')
const {
    save,
    get,
    getUsersMainProfileData,
    getUsersProfileData,
  } = require('../../../dbservice/v1/user');
  const {
    saveproduct,
    getproduct,
    productupdate,
    getUsersOrderData,
    getUserlist,
    viewsingleUser,
    getUsersKyclist,
    fetchKycDetail,
    userKycVerify,
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

module.exports.adminlogin = async ({
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
    if(user.role !== 'Admin'){
      throw 'Admin is not exits';
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

  module.exports.addproduct = async (req, res) => {
    try {
        let productDetails = {
          "title": req.body.title,
          "price": req.body.price,
          "imageUrl": req.files.imageUrl[0].path,
          "userId":req.user._id,
        };
      product = await saveproduct(productDetails);
      console.log('hey is product is',productDetails)
      handleResponse({ res,msg:'Product addded Successfully', data: product });
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.viewproduct = async (req, res) => {
    try {
    const products =  await Productmodel.find({})
      handleResponse({ res,msg:'Product fetch successfully', data: products });
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.viewproductdetails = async ({ query: { productId} },
    res,
  ) => {
    try {
      const productdetail =  await Productmodel.findById(productId)
      handleResponse({ res,msg:'ProductDetails fetch successfully', data: productdetail });
    } catch (err) {
      handleError({ res, err });
    }
  };
  module.exports.updateproducts = async (req, res)  => {
    try {
      const productId = req.params.productId
        const data = await productupdate(req,productId)
        if(data){
          handleResponse({ res,msg:'ProductDetails update successfully', data: data });
        }else{
          throw 'not data found'
        }
    }
    catch (err) {
      handleError({ res, err });
    }
}

module.exports.vieworder = async (req,res,next) => {
  try {
    const user = await getUsersOrderData();
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

module.exports.viewsingleorder = async (req,res) => {
  try {
    const orderId = req.params.orderId;
    const user = await  OrderModel.findById({_id:orderId})
                                  .select('quantity _id')
                                  .populate('userId','shippingAddress firstName')
                                  .populate('product','title price')
  handleResponse({ res, data: user });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.userlist = async (req,res,next) => {
  try {
    const user = await getUserlist();
    handleResponse({
      res,
      statusCode: 200,
      msg: 'Your fetch user data Successully',
      data:user,
    });
    } catch (err) {
    handleError({ res, err });
  }
};
module.exports.viewsingleUser = async ({ query: { userId} },
  res,
) => {
  try {
    const user = await viewsingleUser(userId);
    handleResponse({ res, msg: 'Your fetch user Details Successully',data: user });
  } catch (err) {
    handleError({ res, err });
  }
};
module.exports.fetchKyclist = async (req,res) => {
  // console.log('vv',userId)
  try {
    const user = await getUsersKyclist();
    handleResponse({ res,msg:'KYC Status Displayed successfully', data: user });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.fetchKycDetails = async ({ query: { userId} },
  res,
) => {
  try {
    const user = await fetchKycDetail(userId);
    handleResponse({ res, msg: 'Your fetch user KYC Details Successfully',data: user });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.updatekycstatus = async (req,res) => {
  try {
    const user = await userKycVerify(req,res);
    handleResponse({ res, msg: 'Your Kyc Status Update Successfully'});
  } catch (err) {
    handleError({ res, err });
  }
};