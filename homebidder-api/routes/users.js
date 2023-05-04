const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");



module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  registerBidder,
  getPropertyBidsLog,
  addUserBids,
  updateBidStatusAccepted,
  updateBidStatusRejected,
  getNotifications,
  getUnReadNotifications,
  confirmNotificationRead,
  addNotification

}, updateBids, updateBidders , updateNotification) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
    .then((users) => res.json(users))
    .catch((err) => res.json({
        error: err.message
    }));
  });
//register
  router.post('/register', (req,res) => {
    console.log(req.body)
    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    getUserByEmail(email)
      .then(user => {
          if (user) {
              res.json({
                  msg: 'Sorry, a user account with this email already exists'
              });
          } else {
              const passwordHashed = bcrypt.hashSync(password, salt);
              console.log("pass",passwordHashed)
              return addUser(first_name, last_name, email, passwordHashed)
          }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));
  })

  //login to check and compare password
  router.post('/login', (req, res) => {

    const {email, password} = req.body;

    getUserByEmail(email)
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            console.log("password match")
            const token = jwt.sign({
              email : req.body.email,},"secret123")
              req.session.userId = user.id;
              req.session.email = user.email;
            res.json({auth:true,token:token,user:user})
          } else {
            res.json({ auth :false,
              msg: 'Wrong Credentials'
            });
          }
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  })
  const verfiyjwt = (req,res,next)=> {
    const token = req.headers['x-access-token']
    if(!token){
      res.send("you need a token")
    } else {
      jwt.verify(token,"secret123",(err,token)=>{
        if(err){
          res.json({auth:false,message:"you are not authenticated"})
        } else {
          req.email = token.email
          next()
        }
    })
    }
  };

  router.get('/userAuth',verfiyjwt,(req,res) => {
    res.send("you are  authenticated")
  })

  router.get('/getUser', (req, res) => {
    const email = req.session.email;
    if (email) {
      getUserByEmail(email)
        .then(result =>   { console.log(result); res.json(result) })
        .catch(error => res.json(error));
    } else {
      res.json({});
    }
  })

  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(201).send("user successfully logout");
  })

  router.post('/bidder', (req, res) => {
    const user_id = req.session.userId
    const { bidId } = req.body;
    registerBidder(user_id, bidId)
    .then((result) => {
      setTimeout(() => {
        updateBidders(result);
        res.json(true)
      }, 500);
    })
      .catch(error => res.json(error))
  })

  router.get('/bids/:propertyId' , (req, res) => {
    const propertyId = req.params.propertyId;

    getPropertyBidsLog(propertyId)
    .then(result => res.json(result))
  })

  router.post('/bid', (req, res) => {
    const {data } = req.body;
    const registrationId = data.registrationId;
    const amount = data.amount;
    addUserBids(registrationId, amount)
    .then((result) => {
      setTimeout(() => {
        updateBids(result);
      }, 1000);
    })
    .catch(error => res.json(error));
  })

  router.put('/seller/accept', (req, res) => {
    const { data } = req.body
    const { property_id, buyer_id, message} = data;

    updateBidStatusAccepted(property_id)
    .then(result => {
        addNotification(buyer_id, message)
        .then(result => updateNotification(result))
        .then(result => res.json(result))
    })
    .catch(error => res.json(error))
  })

  router.put('/seller/reject', (req, res) => {
    const { data } = req.body
    const { property_id, buyer_id, message} = data;
    updateBidStatusRejected(property_id)
    .then(result => {
        addNotification(buyer_id, message)
        .then(result => updateNotification(result))
        .then(result => res.json(result))
      }).catch(err => res.json(err));
  })

  // Get all the notifications for a specific user
  router.get('/notifications', (req, res) => {
    const userId = req.session.userId

    getNotifications(userId)
      .then(result => res.json(result))
      .catch(error => res.json(error));
  });

  // Get all unread notifications for a specific user
  router.get('/notifications/unread', (req, res) => {
    const userId = req.session.userId

    getUnReadNotifications(userId)
      .then(result => res.json(result))
      .catch(error => res.json(error));
  });

  // Update notification has_read = true
  router.patch('/notifications', (req, res) => {
    const data = req.body.data;
    const notificationId = data.messageId;

    console.log('backend notificationId ==> ', data)

    confirmNotificationRead(notificationId)
      .then((result) => res.json(result))
      .catch(error => res.json(error));
  });

  return router;
}
