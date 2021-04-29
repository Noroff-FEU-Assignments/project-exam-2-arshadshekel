import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Hotels from "./components/pages/Hotels";
import "./sass/style.scss";
import ContactUs from "./components/pages/ContactUs";

function App() {
  return (
    /*    <AuthProvider> */
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route path="/hotels">
          <Hotels />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
      </Switch>
      <Footer />
    </Router>
    /*   </AuthProvider> */
  );
}

export default App;
