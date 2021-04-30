import { Button } from "react-bootstrap";
import hotelImg from "../../images/hotel-thumbnail.png";

function Hotelcard(props) {
  return (
    <div className="hotel-card">
      <img
        src={hotelImg}
        alt="hotel thumbnail"
        className="hotel-card-img mx-auto"
      />
      <div className="pl-md-5">
        <h3>{props.name}</h3>
        <p>4 star hotel</p>
        <p>
          Polished hotel along Bryggen wharf, offering 2 restaurants, a fitness
          center & free breakfast.
        </p>

        <Button className="mr-3 mt-3 btn-warning">Contact hotel</Button>
        <Button className="mt-3">View more </Button>
      </div>
    </div>
  );
}

export default Hotelcard;
