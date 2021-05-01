import { React, useContext } from "react";
import AuthContext from "../../context/AuthContext";

function AdminPage() {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <div>
      {auth ? (
        <div className="container">
          <h1>Logged in</h1>
        </div>
      ) : (
        <div className="container">
          <h1>Not Logged in</h1>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
