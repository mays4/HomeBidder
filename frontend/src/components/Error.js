import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Error() {
  return (
  <Alert variant="danger">
    You are on wrong way!!
    <Alert.Link as={Link} to="/"> Go to the Home</Alert.Link>.
  </Alert>
  );

}