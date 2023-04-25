import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer, {
  SET_PROPERTY_DATA,
  SET_PROPERTY_ID,
  SET_FAV,

} from '../reducer/Property'
const usePropertyData = () => {

  const [state, dispatch] = useReducer(reducer, {
    propertyId: 0,
    properties: [],
    fav:[],
  });

  const setPropertyId = id => dispatch({ type: SET_PROPERTY_ID, id});

  useEffect(() => {
    Promise.all([
      axios.get('/api/properties'),
      axios.get('/api/properties/favorites/all')
    ])
    .then(
      ([{ data: properties }, { data: fav }]) =>
        dispatch({
          type: SET_PROPERTY_DATA,
          properties,
          fav,
        })
      )
    .catch(e => console.log(e));
  }, []);

  const addToYourFav = (user_id, property_id) => {
    return axios.post(`/api/properties/favorites/new`, {property_id,user_id})
      .then(res => {
        const fav = res.data;
        const id = fav.id;
        dispatch({type:SET_FAV, id, fav});
      })
  }

  const removeFromFav = (user_id, property_id) => {
    return axios.delete(`/api/properties/favorites/${property_id}`, {data : {data : user_id}})
      .then(res => {
        const fav = res.data; 
        const id = fav.id;
        dispatch({type:SET_FAV, id, fav});
      })
  }


  return {state, setPropertyId, addToYourFav, removeFromFav}
}

export default usePropertyData;