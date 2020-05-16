const express = require('express');

const router = express.Router();

const { validate } = require('express-jsonschema');


const {
  signUp,
  loginValidation,
  forgotPwd,
  resetPwd,
  changePwd,
  verifyOTP,
  resendOTP,
  emailVerify,
  emailConfirm,
  getProfile,
  updateProfile,
  add_shipining_add,
  getkyc,
  kyc,
  postorder,
  getorder,
  orderdetails,
} = require('../../common/utils/userValidations');

const {
  UserManagement: {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyOtp,
    emailConfirmation,
    resendOtp,
    emailVerification,
    getsingleUser,
    getUser,
    updateProfiles,
    add_shipining_address,
    uploadKycDetails,
    uploadKycProofData,
    fetchuploadKycProofData,
    showproduct,
    productorder,
    getOrder,
    getOrderDetails,
    cancleorder,
  },
} = require('../../controller/v1/user');

// User
router.post('/register', validate({ body: signUp }), register);
router.post('/login', validate({ body: loginValidation }), login);
router.post('/forgot-password', validate({ body: forgotPwd }), forgotPassword);
router.post('/reset-password', validate({ body: resetPwd }), resetPassword);
router.post('/change-password', validate({ body: changePwd }), changePassword);
router.post('/verify-otp', validate({ body: verifyOTP }), verifyOtp);
router.post('/resend-otp', validate({ body: resendOTP }), resendOtp);
router.get('/email-confirmation', validate({ query: emailConfirm }), emailConfirmation);
router.post('/email-verification', validate({ body: emailVerify }), emailVerification);
router.get('/getoneProfile',  validate({ query: getProfile }),getsingleUser);
router.get('/getProfile',getUser);
router.put('/:profileId', validate({ body: updateProfile }), updateProfiles);
router.post('/add-shipping-address', validate({ body: add_shipining_add }), add_shipining_address);
router.post('/kycDetails', uploadKycDetails);
router.post('/uploadKycProof',uploadKycProofData)
router.get('/kyc', validate({ query: getkyc }),fetchuploadKycProofData)
//Product
router.get('/showproduct',showproduct)
router.post('/postorder',validate({body:postorder}),productorder)
router.get('/getOrder', validate({ query: getorder }),getOrder);
router.get('/getOrderDetails/:orderId',getOrderDetails);
router.delete('/cancleOrder/:orderId',cancleorder);

module.exports = router;

