import React from "react";
import { Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AdminDashboard() {
  return (
    <div>
      <h1>This is dashboard</h1>
      <LinkContainer to="/admin/add">
          <Button>Add hotel</Button>
      </LinkContainer>
    </div>
  );
}

export default AdminDashboard;
