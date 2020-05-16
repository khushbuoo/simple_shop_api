module.exports = {
    signUp: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          // required: true,
        },
        email: {
          type: 'string',
          // required: true,
        },
        password: {
          type: 'string',
          // required: true,
          minlength: 8,
          validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        },
        role:{
          type:String,
          // required: true,
        }
      },
    },
    loginValidation: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
          // required: true,
        },
      },
    },
    forgotPwd: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
      },
    },
    resetPwd: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
        newPassword: {
          type: 'string',
          required: true,
          minlength: 8,
          validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        },
      },
    },
    changePwd: {
      type: 'object',
      properties: {
        newPassword: {
          type: 'string',
          required: true,
          minlength: 8,
          validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        },
        oldPassword: {
          type: 'string',
          required: true,
        },
      },
    },
    verifyOTP: {
      type: 'object',
      properties: {
        otp: {
          type: 'string',
          required: true,
        },
      },
    },
    resendOTP: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
      },
    },
    emailVerify: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          required: true,
        },
      },
    },
    emailConfirm: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
        emailVerificationToken: {
          type: 'string',
          required: true,
        },
      },
    },
    getProfile: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
      },
    },
    updateProfile: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          // required: true,
        },
        email: {
          type: 'string',
          // required: true,
        },
        password: {
          type: 'string',
          // required: true,
          minlength: 8,
          validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        },
      },
    },
    add_shipining_add: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          // required: true,
        },
      },
    },
    getkyc: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
      },
    },
    postorder: {
      type: 'object',
      properties: {
        product: {
          type: 'string',
          required: true,
        },
        quantity:{
          type: 'string',
          required: true,
        }
      },
    },
    getorder: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
      },
    },
    // orderdetails: {
    //   type: 'object',
    //   properties: {
    //     userId: {
    //       type: 'string',
    //       required: true,
    //     },
    //     orderId:{
    //       type: 'string',
    //       required: true,
    //     }
    //   },
    // },
  };