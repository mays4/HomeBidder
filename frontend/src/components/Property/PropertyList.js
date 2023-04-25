import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Header from '../Header';
import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';

import Footer from '../Footer';

export default function PropertyList() {
  
  const {addToYourFav, removeFromFav, state} = useContext(propertyContext);
  const user = state.loggedUser;
  const Userid = user && user.id
  const userFav = state.fav && state.fav.map(item => item.user_id ===  Userid ? item.property_id : 0);
  
  const propertylist = state.properties.map(item => 
              item.is_approved === true &&
                      <PropertListItem 
                        key={item.id} 
                        properties={item}
                        fav={userFav}
                        user={user}
                        addToFav={addToYourFav}
                        removeFav={removeFromFav}
                        myList={false}
                      />)
  
  return (
    <>
    <Header />
    <Container>
      <h2><hr/></h2>
      <div className="property-list">
        <Row>
          {propertylist}
        </Row>
      </div>
    </Container>
    <Footer></Footer>
    </>
  );

}