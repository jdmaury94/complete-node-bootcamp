const fs = require('fs');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


const express = require('express');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get(
  '/me',
  userController.getMe, //To fake that ID is coming actually coming from URL
  userController.getUser
);
router.patch(
  '/updateMe', 
   userController.uploadUserPhoto,
   userController.resizeUserPhoto,
   userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
