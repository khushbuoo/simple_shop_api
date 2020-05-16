const express = require('express');
const router = express.Router();

const { isAuthenticated,isAuthenticatedAdmin } = require('../../common/utils/middlewares/authCheck');

const users = require('./users');
const admin = require('./admin');



router.use('/users',isAuthenticated, users);
router.use('/admin',isAuthenticatedAdmin, admin);


module.exports = router;
