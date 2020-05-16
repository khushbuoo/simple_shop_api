module.exports = {
  mongoUrl:"mongodb://localhost:27017/services",
  appSecret:
    'fd51d1856e23fb259b6c1094b7b47cad70c2cb7b09688d98b4425f23319e0ec5a2bba11d9098f2a8f27863b7eb6c5f99',
    notificationTypes: {
      USER_REGISTERED: 'USER_REGISTERED',
      FORGOT_PASSWORD: 'FORGOT_PASSWORD',
      OTP_SEND: 'OTP_SEND',
      CHANGE_PASSWORD: 'CHANGE_PASSWORD',
      EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
      ADD_MEMBER_PUSH: 'ADD_MEMBER_PUSH',
      ADD_MEMBER_EMAIL: 'ADD_MEMBER_EMAIL',
      ADD_MEMBER_SMS: 'ADD_MEMBER_SMS',
    },
  };