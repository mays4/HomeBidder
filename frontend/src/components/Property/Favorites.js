import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';
import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';


export default function Favorites() {
  const {addToYourFav, removeFromFav, state} = useContext(propertyContext);
  const user = state.loggedUser;
  const Userid = user && user.id;
  const userFav = state.fav && state.fav.map(item => item.user_id ===  Userid ? item.property_id : 0);

  const propertylist = state.properties.map(item => {
    if (userFav && userFav.includes(item.id)) {
     return <PropertListItem
      key={item.id}
      properties={item}
      fav={userFav}
      user={user}
      addToFav={addToYourFav}
      removeFav={removeFromFav}
      myList={false}
    />
    }
  })


  return (
    <>
    <Container className="col-lg-10">
      <h5><hr/>My Favourites</h5>
      <div className="property-list">
        <Row>
          {propertylist}
        </Row>
      </div>
    </Container>
    </>
  );

}