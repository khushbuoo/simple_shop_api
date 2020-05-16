const express = require('express');

const router = express.Router();

const { validate } = require('express-jsonschema');

const {
    adminloginvalidation,
    addproductvalidation,
    viewproductdetail,
    viewProfile,
    fetchKycDetail,
} = require('../../common/utils/adminValidations');

const {
    AdminManagement: {
      adminlogin,
      addproduct,
      viewproduct,
      viewproductdetails,
      updateproducts,
      vieworder,
      viewsingleorder,
      userlist,
      userDetails,
      viewsingleUser,
      fetchKyclist,
      fetchKycDetails,
      updatekycstatus,
    },
  } = require('../../controller/v1/admin');

// Admin
router.post('/adminlogin', validate({ body: adminloginvalidation }), adminlogin);
router.post('/addproduct', validate({ body: addproductvalidation }), addproduct);
router.get('/viewproduct',viewproduct );
router.get('/viewproductdetalis', validate({ query:viewproductdetail }),viewproductdetails);
router.put('/updateproduct/:productId', updateproducts);
router.get('/viewOrder', vieworder);
router.get('/viewsingleOrder/:orderId',viewsingleorder);
router.get('/viewProfilelist',userlist);
router.get('/viewoneProfile',  validate({ query: viewProfile }),viewsingleUser);
router.get('/kyclist',fetchKyclist)
router.get('/KycDetails',validate({ query: fetchKycDetail }),fetchKycDetails);
router.put('/Updatekycstatus/:userId',updatekycstatus);


module.exports = router;

