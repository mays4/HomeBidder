const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors= require("cors");
const cookieSession = require('cookie-session');

var sockIO = require('socket.io')();


const usersRouter = require('./routes/users');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const propertyRouter = require('./routes/properties');
const { getProperties, getPropertiesPhotos } = dbHelpers;
const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ["little things", "!PePper234$lo"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use (cors())


app.sockIO = sockIO;

sockIO.on('connection', function(socket){
    socket.onmessage = event => {
      if (event.data === "ping") {
        socket.send(JSON.stringify("pong"));
      }
    }
});


  const updateBids = (bids) => {
    sockIO.emit("bid",
      JSON.stringify({
        type: "SET_BIDS",
        bids
      })
    );
  }

  const updateBidders = (bidder) => {
    sockIO.emit("bidders",
      JSON.stringify({
        type: "SET_BIDDER",
        bidder
      })
    );
  }

  const updateNotification = (notification) => {
    sockIO.emit("notification",
      JSON.stringify({
        type: "SET_NOTIFICATION",
        notification
      })
    );
  }

  const updateProperties = () => {
    getProperties()
    .then((properties) => {
      const getData = async () => {
        return Promise.all(
          properties.map((property) =>
            getPropertiesPhotos(property.property_id).then((images) => {
              return { ...property, thumbnail: images };
            })
          )
        );
      };
      getData().then((properties) => {
      sockIO.emit("properties",
        JSON.stringify({
          type: "SET_PROPERTIES",
          properties
        })
      );
    })
  })
  }

  getProperties
  app.use('/api/users', usersRouter(dbHelpers, updateBids, updateBidders, updateNotification));

  app.use('/api/properties', propertyRouter(dbHelpers, updateNotification, updateProperties));




module.exports = app;
