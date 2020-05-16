const jwt = require('jsonwebtoken');
const { appSecret } = require('../../../config/config');
const { handleError } = require('./requestHandlers');
const { get } = require('../../../dbservice/v1/user');

const appURI = '/v1';
const skipUrls = [
  '/register',
  '/forgot-password',
  '/login',
  '/reset-password',
  '/verify-otp',
  '/resend-otp',
  '/email-confirmation',
  '/getoneProfile',
  '/getProfile',
  '/showproduct',
];

module.exports.isAuthenticated = async function isAuthenticated(
  req,
  res,
  next,
) {
  const url = req.url.replace(appURI, '').split('?')[0];
  let token;
  if (skipUrls.indexOf(url) !== -1) return next();
  if (req.headers.authorization !== undefined) {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    const user = await jwt.verify(token, appSecret);
    req.userData = user;
    if (req.userData.role  == 'Admin') {
      throw 'it cannot access is user';
    } else {
    //   console.log('user isheeeeeeeeeeeeeeeeeeeeeee',user);
    // console.log('req iszzzzzzzzzzzzzzzzzzzzzzzzz',req.userData.role)
    req.user = await get(user._id, '_id');
    // console.log('req issssssssssssssssssssssss',req.user)
    // console.log('requser',req.user.token)
    if (!req.user) throw 'Invalid token,No user exists';
    // console.log('token is ',token)
    if (req.user.token !== token) {
      throw 'Your login session has expired';
    }
    return next();
    }
  } catch (err) {
    return handleError({ res, err, statusCode: 401 });
  }
  // req.userId =  req.userData;
};

const appURIADMIN = '/v1';
const skipUrlsADMIN = [
  '/adminlogin',
];
module.exports.isAuthenticatedAdmin = async function isAuthenticatedAdmin(
  req,
  res,
  next,
) {
  const url = req.url.replace(appURIADMIN, '').split('?')[0];
  // console.log('jayyyyyyyyyyyyy',url)
  let token;
  if (skipUrlsADMIN.indexOf(url) !== -1) return next();
  if (req.headers.authorization !== undefined) {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    const user = await jwt.verify(token, appSecret);
    req.userData = user;
    if (req.userData.role  == 'USER') {
      throw 'it cannot access';
    } else {
    //   console.log('user isheeeeeeeeeeeeeeeeeeeeeee',user);
    // console.log('req iszzzzzzzzzzzzzzzzzzzzzzzzz',req.userData.role)
    req.user = await get(user._id, '_id');
    // console.log('req issssssssssssssssssssssss',req.user)
    // console.log('requser',req.user.token)
    if (!req.user) throw 'Invalid token,No user exists';
    // console.log('token is ',token)
    if (req.user.token !== token) {
      throw 'Your login session has expired';
    }
    return next();
    }
  } catch (err) {
    return handleError({ res, err, statusCode: 401 });
  }
  // req.userId =  req.userData;
};
