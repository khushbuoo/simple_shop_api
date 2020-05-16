const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('request');
const app = express();
const bodyparser = require('body-parser');
// app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const mongoose = require('mongoose');
const multer  = require('multer')
const db = require('./config/config').mongoUrl;
mongoose.connect(db)
.then(()=>console.log('connection is successfully'))
.catch(err=>{console.log(err)});

    const fileStorage = multer.diskStorage({
        destination:  (req, file, cb) => {
          if (file.fieldname == `documentImage`) cb(null, './public/media/images');  //specify the path were image is store
          else if (file.fieldname == `holdingDocument`) cb(null, './public/media/images');
          else if (file.fieldname == `imageUrl`) cb(null, './public/media/productimages');
          else cb(null, 'images');
        },
        filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);  //file naming convresation
        }
        });
        const fileFilter = (req, file, cb) => {
            if (
              file.mimetype === 'image/png' ||
              file.mimetype === 'image/jpg' ||
              file.mimetype === 'image/jpeg'
            ) {
              cb(null, true);
            } else {
              cb(null, false);
            }
          };
          app.use(
            multer({ storage: fileStorage, fileFilter: fileFilter }).fields([{
              name: 'documentImage', maxCount: 3
            }, {
              name: 'holdingDocument', maxCount: 1
            }, {
              name: 'imageUrl', maxCount: 1
            }])
          );
          app.use(express.static(path.join(__dirname, 'public')));

          const indexRoutes = require('./routes/v1');
          app.set('views',path.join(__dirname,'/views/'));
          app.use('/api/v1',indexRoutes);
          app.use((req, res, next) => {
            next(createError(404));
          });
          app.use((err, req, res, next) => {
            let responseData;
            if (err.name === 'JsonSchemaValidation') {
              // Set a bad request http response status
              res.status(400);
              responseData = {
                result: 0,
                msg: err.message.split(':')[1],
                data: err.validations.body, // All of your validation information
              };
              res.json(responseData);
            } else {
              // set locals, only providing error in development
              res.locals.message = err.message;
              res.locals.error = req.app.get('env') === 'development' ? err : {};
              // render the error page
              res.status(err.status || 500);
              res.render('error');
            }
          });
const port = process.env.port||3000;
app.listen(port,()=>{
    console.log(`app is running at port${port}`);
})