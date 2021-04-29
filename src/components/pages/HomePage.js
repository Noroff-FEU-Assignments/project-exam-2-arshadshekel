import { Jumbotron, Button, Container } from "react-bootstrap";
import bgimage from "../../images/bergen.jpg";

function HomePage() {
  return (
    <div>
      <Jumbotron
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
                  height: "calc(90vh)",
                  marginBottom: "0px",
        }}
      >
        <Container>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more </Button>
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default HomePage;
