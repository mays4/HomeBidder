const express = require("express");
const router = express.Router();

module.exports = ({
  getProperties,
  addProperty,
  getPropertiesPhotos,
  getRegisteredUsersAndBids,
  getPropertyDetailsById,
  getAllFavorites,
  addToFavorites,
  removeFromFavorites,
  addBidSession,
  addPropertyImage,
  addbidlog,
  adduserRegistration,
  getBidsbyUser,
  addToBidHistory,
  addNotification,
  getAllPending,
  updateApproved,
}, updateNotification, updateProperties) => {
  /* GET properties listing. */
  router.get("/", (req, res) => {
    getProperties()
      .then((properties) => {
        const getData = async () => {
          return Promise.all(
            properties.map((property) =>
              getPropertiesPhotos(property.property_id).then((images) => {
                return { ...property, thumbnail: images };
              })
            ));
        };
        getData().then((data) => {
          res.json(data);
        });
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });
  // Get all the pending listings for Admin
  router.get("/admin/pending", (req, res) => {
    getAllPending()
      .then((result) => res.json(result))
      .catch((error) => res.json(error));
  });
  ///get bidder registrations and bids
  // router.get("/bidder", (req, res) => {
  //   getRegisteredUsersAndBids()
  //     .then((bidders) => res.json(bidders))
  //     .catch((err) =>
  //       res.json({
  //         error: err.message,
  //       })
  //     );
  // });

  // Get all the pending listings for Admin
  router.get('/admin/pending', (req, res) => {
    getAllPending()
      .then(result => res.json(result))
      .catch(error => res.json(error));
  });

  //to get fav
  router.get("/favorites/all", (req, res) => {
    getAllFavorites()
      .then((result) => res.json(result))
      .catch((error) => res.json(error));
  });
  ///get bidder registrations and bids
  router.get("/bidder/:propertyId", (req, res) => {
    const propertyId = req.params.propertyId;
    getRegisteredUsersAndBids(propertyId)
      .then((bidders) => res.json(bidders))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // get all the details by passing id
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    getPropertyDetailsById(id)
      .then(property => {
        if(property) {
          return new Promise(resolve => {
              getPropertiesPhotos(id)
                .then(images =>  {
                  if (images) {
                    property['thumbnail'] = images;
                  }
                  resolve(property)
                })
              })
              .then(result => res.json(result))
          }
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //add properties
    router.post("/new", (req, res) => {
      const owner_id = req.session.userId
      const {

        number_of_bathrooms,
        number_of_bedrooms,
        parking_spaces,
        street,
        city,
        province,
        post_code,
        square_footage,
        property_type,
        year_built,
        base_price_in_cents,
        bid_start_date,
        bid_end_date,
        image_url,
      } = req.body;

      addProperty(
        owner_id,
        number_of_bathrooms,
        number_of_bedrooms,
        parking_spaces,
        street,
        city,
        province,
        post_code,
        square_footage,
        property_type,
        year_built
      )
        .then((property) => {
          return new Promise((resolve) => {
            addBidSession(
              property.id,
              base_price_in_cents,
              bid_start_date,
              bid_end_date
            ).then((response) => {

              const image = req.body.image_url;
              addPropertyImage(property.id, image)
              .then((response) => {
                updateProperties()
                resolve(property)
              })
            });
          }).then((result) => res.json(result));
        })
        .catch((error) => res.status(500).send(error.message));
    });
  // Update the is_approved status of a pending listing
  router.patch("/admin/pending", (req, res) => {
    const data = req.body.data;

    // const isApproved = data.is_approved;
    const propertyId = data.property_id;
    const address = data.street;
    const userId = data.user_id;
    const userName = data.first_name;
    const message = `Hi ${userName}! Your property at ${address} has been approved and is now posted in the listings.`;

    updateApproved(propertyId)
      .then((result) => {
        return new Promise((resolve) => {
          addNotification(userId, message)
          .then(result => updateNotification(result))
          .then(result => updateProperties())
          resolve(result)
        })
        .then((result) => res.json(result));
      })
      .catch((error) => res.json(error));
  });

 //add post bid
 router.post('/bidder',(req,res)=> {
    const{
      bidder_registration_id,
      amount
    } = req.body
  addbidlog(bidder_registration_id,amount).then((bid) => res.json(bid))
  .catch((error) => res.status(500).send(error.message));
 });




  //git bids from db
  router.get("/properties/myBids", (req, res) => {
    getBidsbyUser(req.session.userId)
      .then((properties) => {
        const getData = async () => {
          return Promise.all(
            properties.map((property) =>
              getPropertiesPhotos(property.id).then((images) => {
                return { ...property, thumbnail: images };
              })
            )
          );
        };
        getData().then((data) => {
          res.json(data);
        });
      })
      .catch((error) => res.json(error));
  });

  //add post bid
  router.post("/bidder", (req, res) => {
    const { bidder_registration_id, amount } = req.body;
    addbidlog(bidder_registration_id, amount)
      .then((bid) => res.json(bid))
      .catch((error) => res.status(500).send(error.message));
  });

  //add and remove from fav
  router.post("/favorites/new", (req, res) => {
    const user_id = req.body.user_id;
    const property_id = req.body.property_id;
    addToFavorites(user_id, property_id)
      .then((result) => res.json(result))
      .catch((error) => res.json(error));
  });

  router.delete("/favorites/:property_id", (req, res) => {
    const user_id = req.body.data;
    const property_id = req.params.property_id;
    removeFromFavorites(user_id, property_id)
      .then((result) => res.json(result))
      .catch((error) => res.json(error));
  });

  router.post("/userRegisteration", (req, res) => {
    const { bids_id, user_id } = req.body;
    adduserRegistration(bids_id, user_id)
      .then((register) => res.json(register))
      .catch((error) => res.status(500).send(error.message));
  });

  //add to propertyHistory
  router.post("/bids/history", (req, res) => {
    const { data } = req.body;
    console.log("datahistory",data)
    const { amount, property_id, userId, owner_id } = data;

    addToBidHistory(amount, property_id, userId)
      .then((result) => {
        return new Promise((resolve) => {
          addNotification(
            userId,
            "You Won The Bid, Wait for the sellers Response, You will get a notification when seller accept your offer!"
          ).then(result => updateNotification(result))
          .then((result) => {
            addNotification(
              owner_id,
              "Your Listted Property's Bidding is Over, Please go to My Listing and check the details, and Review the offer price"
            ).then(result => updateNotification(result))
            resolve(result);
          });
        }).then((result) => res.json(result));
      })
    .catch(error => res.json(error))
  })


  return router;
};
