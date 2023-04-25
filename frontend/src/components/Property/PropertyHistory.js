import { Table} from "react-bootstrap";
import "./Property.css";
import "font-awesome/css/font-awesome.min.css";


export default function PropertyHistory() {

  return (
    <>
      <div>
        <h4>Price History</h4>
      </div>

      <div className="container-fluid">
        <Table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Year</th>
              <th scope="col">Amount Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>2011</td>
              <td>$2,380,000</td>

            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2013</td>
              <td>$2,380,080</td>
            </tr>
          </tbody>
        </Table>
        <div >
        </div>
      </div>
    </>
  );
}
