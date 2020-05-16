module.exports = {
    adminloginvalidation: {
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
    addproductvalidation: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          // required: true,
        },
        price: {
          type: 'string',
          // required: true,
        },
        imageUrl: {
          type: 'string',
          // required: true,
        },
        userId:{
          // type: Schema.Types.ObjectId,
        // ref: 'users',
        }
      },
    },
    viewproductdetail: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
          required: true,
        },
      },
    },
    getsingleOrder: {
      type: 'object',
      properties: {
        orderId: {
          type: 'string',
          required: true,
        },
      },
    },
    viewProfile: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
      },
    },
    fetchKycDetail: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          required: true,
        },
      },
    },
};

