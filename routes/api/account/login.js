const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../../models/User');
// const keys = require('../../../config/keys');

const login = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    console.log('error2');
    return res.status(400).json(errors.mapped());
  }

  const email = req.body.email;
  const password = req.body.password;

  if (email === 'example@example.com') {
    errors.email = 'Wrong credentials';
    errors.password = 'Wrong credentials';
    console.log('wrong address');
    return res.status(400).json(errors);
  }

  //find user by email
  User.findOne({ email }).then((user) => {
    //check for user
    if (!user) {
      errors.email = 'Wrong credentials';
      errors.password = 'Wrong credentials';
      console.log('wrong user');
      return res.status(400).json(errors);
    }
    //check password
    if(password === user.password){
      const payload = {
        id : user.id , 
        name : user.name, 
        staffId : user.staffId , 
        accountType : user.accountType , 
      }
      jwt.sign(
          payload,
          // verifyToken,
          process.env.secretOrKey,

          { expiresIn: '24h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        errors.email = 'Wrong credentials';
        errors.password = 'Wrong credentials';

        return res.status(400).json(errors);
      }

    // bcrypt.compare(password, user.password).then((isMatch) => {
    //   if (isMatch) {
    //     console.log('CORRECT PASSWORD')

        // user matched
        // create jwt payload
        // const payload = {
        //   id: user.id,
        //   name: user.name,
        //   staffId: user.staffId,
        //   accountType: user.accountType,
        // };
        // console.log(payload)
        // if (user.resetPasswordToken && user.resetPasswordToken !== '') {
        //   user.set({ resetPasswordToken: '', resetPasswordExpires: -1 });
        //   user.save();
        // }

        
        // //sign the token

        // jwt.sign(
        //   payload,
        //   // verifyToken,
        //   process.env.secretOrKey,

        //   { expiresIn: '24h' },
        //   (err, token) => {
        //     res.json({
        //       success: true,
        //       token: 'Bearer ' + token,
        //     });
        //   }
        // );
    
    })};


module.exports = login;
