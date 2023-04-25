module.exports = (db) => {

  //GET ALL USERS
  const getUsers = () => {
    const query = {
        text: 'SELECT * FROM users',
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  //CHECK IF USER EMAIL ALREADY EXIST
  const getUserByEmail = email => {

    const query = {
        text: `SELECT * FROM users WHERE email = $1` ,
        values: [email]
    }

    return db
        .query(query)
        .then(result => result.rows[0])
        .catch((err) => err);
  };

  //ADD USER
  const addUser = (firstName, lastName, email, password) => {
    const query = {
        text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
        values: [firstName, lastName, email, password]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  //GET ALL PROPERTIES
  const getProperties = () => {
    const query = {
        text: `SELECT bids.id as bid_id,ph.bid_amount,ph.user_id as buyer_id, ph.is_active as bid_active, properties.*, bids.* FROM properties
           JOIN bids ON properties.id = property_id
           LEFT JOIN property_bid_histories AS ph ON properties.id = ph.property_id
           WHERE properties.is_active = true
          ORDER BY properties.id DESC`,
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  //ADD A PROPERTY TO THE LISTINGS
  const addProperty = (ownerId, numBaths, numBeds, numParking, street, city, province, postCode, squareFootage, propertyType, yearBuilt) => {
    const query = {
      text: `INSERT INTO properties
        (owner_id, number_of_bathrooms, number_of_bedrooms, parking_spaces, street, city, province, post_code, square_footage, property_type, year_built)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      values: [ownerId, numBaths, numBeds, numParking, street, city, province, postCode, squareFootage, propertyType, yearBuilt]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // CREATE A NEW BID SESSION
  const addBidSession = (propertyId, basePrice, bidStartDate, bidEndDate) => {
    const query = {
      text: `INSERT INTO bids
        (property_id, base_price_in_cents, bid_start_date, bid_end_date)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [propertyId, basePrice * 100, bidStartDate, bidEndDate]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // ADD PROPERTY IMAGES
 
    const addPropertyImage = (property_id,image_url) => {
      console.log("f",property_id,"d",image_url)
      const query = {
        text: `INSERT INTO property_images
          (property_id, image_url)
          VALUES ($1, $2) RETURNING *`,
        values: [property_id, image_url]
      }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  //get all the photos
  const getPropertiesPhotos = (property_id) => {
    const query = {
        text: `SELECT * FROM property_images
              where property_id = $1`,
        values: [property_id]
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  //
  const getRegisteredUsersAndBids = (propertyId) => {
    const query = {
      text: `SELECT br.id,br.user_id, br.bids_id FROM bidder_registrations AS br
              JOIN bids ON bids.id = bids_id
              WHERE bids.property_id = $1`,
      values: [propertyId]
  };

  return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };


  ///get property details

  const getPropertyDetailsById= (id) => {
    const query = {
      text: `SELECT bids.id as bid_id,
                property_bid_histories.id as history_id,
                property_bid_histories.bid_amount as offer_amount,
                property_bid_histories.is_active as bid_active,
                property_bid_histories.user_id as buyer_id,
                property_bid_histories.seller_response,
                bids.*, properties.* FROM properties
                JOIN bids ON properties.id = bids.property_id
                LEFT JOIN property_bid_histories ON properties.id = property_bid_histories.property_id
                WHERE properties.id = $1 `,
      values: [id]
  };

  return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getAllFavorites = () => {
    const query = {
      text: `SELECT * FROM favorites`
    };

  return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  }


    // add addbidlog
    const addbidlog = (bidder_registration_id,amount) => {
      const query = {
        text: `INSERT INTO bid_logs
        (bidder_registration_id,amount)
          VALUES ($1, $2) RETURNING *`,
        values: [bidder_registration_id,amount]
      };

      return db
        .query(query)
        .then(result => result.rows[0])
        .catch(err => err);
    }
    // add user registeration
    const adduserRegistration =(bids_id,user_id)=> {
      const query = {text: `INSERT INTO bidder_registrations
      (bids_id,user_id)
        VALUES ($1, $2) RETURNING *`,
      values: [base_price_in_cents, bid_start_date,bid_end_date]
    };
    return db
        .query(query)
        .then(result => result.rows[0])
        .catch(err => err);
    }

  const addToFavorites = (user_id, property_id) => {
    const query = {
      text: `INSERT INTO favorites (user_id, property_id) VALUES ($1::integer, $2::integer)
      RETURNING *`,
      values: [user_id, property_id]
    }
      return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const removeFromFavorites = (user_id, property_id) => {
    const query = {
      text: `DELETE FROM favorites WHERE user_id = $1::integer AND property_id = $2::integer
      RETURNING *`,
      values: [user_id, property_id]
    }
      return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
    };

  const registerBidder = (user_id, bidId) => {
    const query = {
      text: `INSERT INTO bidder_registrations (bids_id, user_id) VALUES (
        $1, $2)
      RETURNING *`,
      values: [bidId , user_id]
    }
      return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  }

  const getPropertyBidsLog = (id) => {
    const query = {
      text: `SELECT bid_logs.id, bid_logs.amount, bid_logs.bidder_registration_id,
            bid_logs.bids_at
            FROM bid_logs
            JOIN bidder_registrations ON bidder_registrations.id =    bidder_registration_id
            JOIN bids ON bids.id = bidder_registrations.bids_id
            WHERE bids.property_id = $1
            ORDER BY bid_logs.id DESC`,
        values: [id]
    };

  return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUserBids = (registration_id, amount) => {
    const query = {
      text: `INSERT INTO bid_logs(bidder_registration_id, amount) VALUES ($1, $2)
              RETURNING *`,
        values: [registration_id, amount]
    };

  return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  }

  const addToBidHistory = (amount, property_id, user_id) => {
    const query = {
      text: `INSERT INTO property_bid_histories (property_id, bid_amount, user_id)
         VALUES ($1, $2, $3)
              RETURNING *`,
        values: [property_id, amount, user_id]
    };

  return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  }

  const getBidsbyUser = (id)=> {
    const query = {
      text: `SELECT * FROM  bidder_registrations
      join bids on bids.id = bidder_registrations.bids_id
      join properties  on bids.property_id = properties.id
      where bidder_registrations.user_id =$1`,
      values: [id]
    }
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  }


  const updateBidStatusAccepted = (property_id) => {

    const query = {
      text: `UPDATE property_bid_histories
              SET
              seller_response = $1,
              is_active = $2
              WHERE property_id = $3
              RETURNING *;`,
      values: ['Accepted', 'FALSE', property_id]
    }
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  }

  const updateBidStatusRejected = (property_id) => {
    const query = {
      text: `UPDATE property_bid_histories
              SET
              seller_response = $1,
              is_active = $2
              WHERE property_id = $3
              RETURNING *;`,
      values: ['Rejected', 'FALSE', property_id]
    }
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  }

    const addNotification = (user_id, message) => {
      const query = {
        text: `INSERT INTO notifications (user_id, message)
            VALUES ($1, $2)
                RETURNING *`,
          values: [user_id, message]
      };

      return db
          .query(query)
          .then((result) => result.rows[0])
          .catch((err) => err);
    };

      const getAllPending = () => {
        const query = {
          text: `SELECT users.first_name, users.last_name, users.email,
                        bids.base_price_in_cents, bids.bid_start_date, bids.bid_end_date,
                        properties.* FROM properties
                 JOIN users on properties.owner_id = users.id
                 JOIN bids on property_id = properties.id
                 WHERE is_approved = FALSE
                 ORDER BY properties.id`
        }

        return db
          .query(query)
          .then(result => result.rows)
          .catch(err => err);
      };

      const updateApproved = (id) => {
        const query = {
          text: `UPDATE properties
                 SET is_approved = true
                 WHERE id = $1 RETURNING *`,
          values: [id]
        }

        return db
          .query(query)
          .then(result => result.rows)
          .catch(err => err);
      };

      const getNotifications = (id) => {
        const query = {
          text: `SELECT * FROM notifications WHERE user_id = $1 ORDER BY id DESC`,
          values: [id]
        }

        return db
          .query(query)
          .then(result => result.rows)
          .catch(err => err);
      };

      const getUnreadNotifications = (id) => {
        const query = {
          text: `SELECT * FROM notifications WHERE user_id = $1 AND has_read = FALSE`,
          values: [id]
        }

        return db
          .query(query)
          .then(result => result.rows)
          .catch(err => err);
      };

      const confirmNotificationRead = (id) => {
        const query = {
          text: `UPDATE notifications
                 SET has_read = true
                 WHERE id = $1 RETURNING *`,
          values: [id]
        }

        return db
          .query(query)
          .then(result => result.rows)
          .catch(err => err);
      };

  return {
    getUsers,
    addUser,
    getUserByEmail,
    getProperties,
    addProperty,
    getPropertiesPhotos,
    getRegisteredUsersAndBids,
    getPropertyDetailsById,
    addbidlog,
    adduserRegistration,
    getAllFavorites,
    addToFavorites,
    removeFromFavorites,
    addbidlog,
    adduserRegistration,
    addBidSession,
    addPropertyImage,
    getBidsbyUser,
    registerBidder, getPropertyBidsLog, addUserBids, addToBidHistory,
    updateBidStatusAccepted,
    updateBidStatusRejected,
    addNotification,
    getAllPending,
    updateApproved,
    getNotifications,
    getUnreadNotifications,
    confirmNotificationRead
  };
};
