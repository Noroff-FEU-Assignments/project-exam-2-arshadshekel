import { Button } from "react-bootstrap";
import { API } from "../../constants/Api";
import { LinkContainer } from "react-router-bootstrap";

function Hotelcard(props) {
  return (
    <div className="hotel-card">
      <LinkContainer to={`hotels/` + props.id}>
        <img
          src={props.picture}
          alt="hotel thumbnail"
          className="hotel-card-img mx-auto"
        />
      </LinkContainer>
      <div className="pl-md-5">
        <LinkContainer to={`hotels/` + props.id}>
          <div>
            <h3>{props.name}</h3>
            <p>4 star hotel</p>
            <p>
              Polished hotel along Bryggen wharf, offering 2 restaurants, a
              fitness center & free breakfast.
            </p>
          </div>
        </LinkContainer>

        <Button className="mr-3 mt-3 btn-warning">Contact hotel</Button>

        <LinkContainer to={`hotels/` + props.id}>
          <Button className="mt-3 text-white">View more </Button>
        </LinkContainer>
      </div>
    </div>
  );
}

export default Hotelcard;
