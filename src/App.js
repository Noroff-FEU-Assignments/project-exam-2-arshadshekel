import Navigation from "./components/layout/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Link from "./components/pages/Link";
import "./App.css";

function App() {
  return (
    /*    <AuthProvider> */
    <Router>
      <div className="container">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route path="/link">
            <Link />
          </Route>
          <Route path="/dashboard" exact>
            {/*   <DashboardPage /> */}
          </Route>
        </Switch>
      </div>
    </Router>
    /*   </AuthProvider> */
  );
}

export default App;
