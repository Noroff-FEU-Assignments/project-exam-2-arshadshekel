import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Hotels from "./components/pages/Hotels";
import "./sass/style.scss";
import ContactUs from "./components/pages/ContactUs";
import Hoteldetails from "./components/hotel/Hoteldetails";
import { AuthProvider } from "./context/AuthContext";
import AdminPage from "./components/admin/AdminPage";
import AdminAddHotels from "./components/admin/AdminAddHotels";

function App() {
  return (
    <AuthProvider >
      <Router >
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/hotels">
            <Hotels />
          </Route>
          <Route exact path="/admin">
            <AdminPage />
          </Route>
          <Route path="/admin/add">
            <AdminAddHotels/>
          </Route>
          <Route path="/hotels/:id">
            <Hoteldetails />
          </Route>
          <Route path="/contact-us">
            <ContactUs />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
