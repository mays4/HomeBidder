export const SET_BIDDER = "SET_BIDDER";
export const SET_BIDS = "SET_BIDS";
export const SET_BIDS_DATA = "SET_BIDS_DATA";


function reducer(state, action) {
  switch (action.type) {

    case SET_BIDS_DATA:
      return {
      ...state,
      properties: action.properties,
      bidders: action.bidders,
      bids: action.bids,
      users: action.users
    }

    case SET_BIDDER:
      return {  
        ...state,
        bidders: [ ...state.bidders, action.bidder ]
    }

    case SET_BIDS:
      return {  
        ...state,
        bids: [ ...state.bids, action.bids ]
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;