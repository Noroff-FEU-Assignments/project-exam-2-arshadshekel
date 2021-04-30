import { Button } from "react-bootstrap";
import { API } from "../../constants/Api";

function Hotelcard(props) {
  return (
    <div className="hotel-card">
      <img
        src={props.picture}
        alt="hotel thumbnail"
        className="hotel-card-img mx-auto"
      />
      <div className="pl-md-5">
        <a href={`hotels/` + props.id}>
          <h3>{props.name}</h3>
          <p>4 star hotel</p>
          <p>
            Polished hotel along Bryggen wharf, offering 2 restaurants, a
            fitness center & free breakfast.
          </p>
        </a>

        <Button className="mr-3 mt-3 btn-warning">Contact hotel</Button>
        <Button className="mt-3">View more </Button>
      </div>
    </div>
  );
}

export default Hotelcard;
