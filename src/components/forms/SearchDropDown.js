import { Typeahead } from "react-bootstrap-typeahead";
import { useState, useEffect, useRef } from "react";
import { API } from "../../constants/Api";
import { useHistory } from "react-router-dom";
import { Button, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";


// This component uses code from the react-bootstrap-typeahead examples
const SearchDropDown = () => {
  const [options, setOptions] = useState([]);
  const searchInput = useRef();

  // Get all hotels
  useEffect(function () {
    async function getHotels() {
      try {
        const response = await fetch(API);
        const result = await response.json();
        const options = result.map((hotel) => ({
          avatar_url: hotel.picture.formats.thumbnail.url,
          id: hotel.id,
          name: hotel.name,
        }));
        setOptions(options);
      } catch (error) {}
    }
    getHotels();
  }, []);

  // Callback function from example, adjusted for this exam
  const filterByCallback = (option, props) =>
    option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;

  const history = useHistory();

  /*Initially this was written so that I could redirect when clicking on the 
    view hotel button. Or that pressing enter redirects. This was due to me using
    onClick in a wrong way. I later found out how to fix, but kept this function regardless
  */
  
    function viewHotel(event) {
        event.preventDefault();
    const findHotel = searchInput.current.props.options.filter((hotel) => {
      if (hotel.name === searchInput.current.inputNode.defaultValue) {
        return true;
      } else {
        return null;
      }
        
    });
      
      // After finding the right hotel redirect to the details page
      console.log(findHotel);
      if (findHotel[0] !== undefined) {
          const hotelID = findHotel[0].id;
            history.push(`hotels/` + hotelID);
      }
  }

    return (
      <Form noValidate onSubmit={viewHotel}>
        <InputGroup className="my-5 search-max-width">
          <InputGroup.Prepend>
            <InputGroup.Text className="rounded-corners">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <>
            <Typeahead
              filterBy={filterByCallback}
              id="custom-filtering-example"
              labelKey="name"
              options={options}
              ref={searchInput}
              placeholder="Search for a hotel..."
              renderMenuItemChildren={(option) => (
                <div
                  onClick={() => {
                    history.push(`hotels/` + option.id);
                  }}
                  key={option.id}
                >
                  <img
                    alt={option.name}
                    src={option.avatar_url}
                    style={{
                      height: "24px",
                      marginRight: "10px",
                      width: "24px",
                    }}
                  />
                  <span>{option.name}</span>
                </div>
              )}
            />
            <InputGroup.Append>
              <Button
                id="submit-search"
                className="primary-button"
                type="submit"
              >
                View hotel
              </Button>
            </InputGroup.Append>
          </>
        </InputGroup>
      </Form>
    );
};

export default SearchDropDown;
