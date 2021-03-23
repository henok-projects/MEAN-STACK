var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const customerModel = require('../models/customers.model');


/* POST/create new customer */
router.post('/add', function(req, res, next) {
 
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let phoneNumber = req.body.phoneNumber;
  let dop = req.body.dop;
  let department = req.body.department;
  
  
  let customerObj = new customerModel({
    firstName:firstName,
    lastName:lastName,
    emailAddress:emailAddress,
    phoneNumber: phoneNumber ,
    dop: dop ,
    department:department
  });
   customerObj.save(function(error,customerObj){
        if (error) { 
          res.send({status:500,message:'unable to add customer'});
        } else {
          res.send({status:200,message:'add successfully',customerDetails:customerObj});
        }

   });
 
});


/* GET All Customers . */
router.get('/List', function(req, res, next) {
  customerModel.find(function(error,customerListResponse){
    if (error) { 
      res.send({status:500,message:'unable to find customers'});
    } else {
      const recordCount = customerListResponse.length;
      res.send({status:200,recordCount:recordCount,results:customerListResponse});
    }
  });
});

/* GET specific Customer detail. */
router.get('/view', function(req, res, next) {
  const userId = req.query.userId;

  customerModel.findById(userId,function(error,customerListResponse){
    if (error) { 
      res.send({status:500,message:'unable to find the customer'});
    } else {
      //const recordCount = customerListResponse.length;
      res.send({status:200,results:customerListResponse});
    }
  });
});

/* update existing customer */
router.put('/update', function(req, res, next) {

  const userId = req.body.userId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let phoneNumber = req.body.phoneNumber;
  let dop = req.body.dop;
  let department = req.body.department;
    
  let customerObj = { 
    firstName:firstName,
    lastName:lastName,
    emailAddress:emailAddress,
    phoneNumber: phoneNumber ,
    dop: dop ,
    department:department
  };
  customerModel.findByIdAndUpdate(userId,customerObj,function(error,customerListResponse){
    if (error) { 
      res.send({status:500,message:'unable to update the customer'});
    } else {
      //const recordCount = customerListResponse.length;
      res.send({status:200,message:'customer updated successfully',results:customerObj});
    }
  });
});
/* delete existing customer */
router.delete('/delete', function(req, res, next) {
  const userId = req.query.userId;

  customerModel.findByIdAndDelete(userId,function(error,customerListResponse){
    if (error) { 
      res.send({status:500,message:'unable to delete the customer'});
    } else {
      
      res.send({status:200,message:'customer deleted successfully',results:customerListResponse});
    }
  });
});

/* delete multiple customer */
router.delete('/delete-multiple', function(req, res, next) {
  const userId = req.query.userId;

  customerModel.deleteMany({'firstName':'Mark'},function(error,customerListResponse){
    if (error) { 
      res.send({status:500,message:'unable to delete the customers'});
    } else {
      
      res.send({status:200,message:'customers deleted successfully'});
    }
  });
});

/* search existing Customers . */
router.get('/search', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
