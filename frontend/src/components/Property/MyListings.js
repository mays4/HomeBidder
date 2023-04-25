import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';
import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import AlertListing from './AlertListing';


export default function MyListings() {
  const {state, addToYourFav, removeFromFav} = useContext(propertyContext);
  const user = state.loggedUser;
  const Userid = user && user.id;
  const userFav = state.fav && state.fav.map(item => item.user_id ===  Userid ? item.property_id : 0);

  const propertylist = state.properties.map(item => {
    if (Userid === item.owner_id) {
     return <PropertListItem
      key={item.id}
      properties={item}
      user={user}
      myList={true}
      addToFav={addToYourFav}
      removeFav={removeFromFav}
      fav={userFav}
    />
    };
  });

  let isEmpty = true;
  for (let i = 0; i < state.properties.length; i++) {
    if (Userid === state.properties[i].owner_id) {
      isEmpty = false;
    };
  };

  return (
    <>
    <Container className="col-lg-10">
      <h5><hr/>My Property Listings</h5>
      <div className="property-list">
        <Row>
          {isEmpty && <AlertListing/>}
          {propertylist}
        </Row>
      </div>
    </Container>
    </>
  );
};