import axios from "axios";
import { useReducer, useEffect, createContext, useRef } from "react";
import reducer, {
  SET_PROPERTY_DATA,
  SET_PROPERTY_ID,
  SET_FAV,
  SET_LOGGED_USER,
  SET_NOTIFICATION,
  SET_PROPERTIES

} from '../reducer/Property';
import io from 'socket.io-client';

export const propertyContext = createContext();

let socketRef;
const CONNECTION_PORT = 'localhost:3001'

export default function PropertyProvider(props) {

  socketRef = useRef(io(CONNECTION_PORT, { transports: ['websocket', 'polling', 'flashsocket'] }));


  const [state, dispatch] = useReducer(reducer, {
    properties: [],
    fav:[],
    loggedUser: {},
    notification: [],
    users: [],
  });


  const setLoggedInUser = (user) => {
    if (!user) {
      axios.post(`/api/users/logout`)
      .then(res => console.log(res));
    }
    dispatch({type : SET_LOGGED_USER, user});
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/properties'),
      axios.get('/api/properties/favorites/all'),
      axios.get('/api/users/getUser'),
      axios.get('/api/users/notifications'),
      axios.get('/api/users/')
    ])
    .then(
      ([{ data: properties }, { data: fav }, {data:loggedUser}, {data: notification}, {data:users}]) =>
        dispatch({
          type: SET_PROPERTY_DATA,
          properties,
          fav,
          loggedUser,
          notification,
          users
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


  useEffect(() => {
    const socket = socketRef.current
    socket.on('notification', function(data) {
      const dataParsed = JSON.parse(data);
      if (dataParsed.type === SET_NOTIFICATION && typeof dataParsed === "object") {
        dispatch(dataParsed);
      }
    })

    socket.on('properties', function(data) {
      const dataParsed = JSON.parse(data);
      if (dataParsed.type === SET_PROPERTIES && typeof dataParsed === "object") {
        dispatch(dataParsed);
      }
    })

    return (() => socket.disconnect());

  }, [dispatch])


  const data = {state, addToYourFav, removeFromFav, setLoggedInUser};

  return (
    <propertyContext.Provider value={data}>
      { props.children }
    </propertyContext.Provider>
  )
}