import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PropertyList from './components/Property/PropertyList';
import Property from './components/Property/Property';
import PostListingForm from './components/Property/PostListingForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favorites from './components/Property/Favorites';
import { useContext } from 'react';
import { propertyContext } from './providers/PropertyProvider';
import Error from './components/Error';
import MyListings from "./components/Property/MyListings";
import PendingList from "./components/Admin/PendingList";
import Notifications from "./components/Property/Notifications";
import MyBids from "./components/Property/MyBids";
import Footer from "./components/Footer";

function App() {

const { state } = useContext(propertyContext);
const loggedIn = Object.keys(state.loggedUser).length ? true : false;
const userType = state.loggedUser && state.loggedUser.user_type;

  return (
        <BrowserRouter>
          <div className="App">
          <NavBar/>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={1700}/>
          <Switch>
            <Route exact path="/">
              <PropertyList />
            </Route>
            <Route exact path="/listing/:propertyId" >
              <Property />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register" >
              <Register />
            </Route>
                <Route exact path="/properties/new" >
                {(loggedIn && userType === 2) ? <PostListingForm /> : <Error />}
              </Route>
            <Route exact path="/properties/favorites">
            {(loggedIn && userType === 2) ?  <Favorites /> :<Error />}
            </Route>
                <Route exact path="/properties/mylistings" >
                {(loggedIn && userType === 2) ? <MyListings /> : <Error />}
              </Route>
                <Route exact path="/users/notifications" >
                {(loggedIn && userType === 2) ? <Notifications /> : <Error />}
              </Route>
                <Route exact path="/admin/pending" >
                {(loggedIn && userType === 1) ? <PendingList /> : <Error />}
              </Route>

            <Route exact path="/properties/Mybids">
            {(loggedIn && userType === 2) ? <MyBids/>:<Error />}
            </Route>
            <Route exact path="/404">
              <Error />
            </Route>
          </Switch>
          <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
