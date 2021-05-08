import { Typeahead } from "react-bootstrap-typeahead";
import { useState, Fragment, useEffect, useRef } from "react";
import { API } from "../../constants/Api";
import { useHistory } from "react-router-dom";
import { Button, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchDropDown = () => {
  const [options, setOptions] = useState([]);
  const searchInput = useRef();

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

  const filterByCallback = (option, props) =>
    option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;

  const history = useHistory();

    function viewHotel(event) {
        event.preventDefault();
    const findHotel = searchInput.current.props.options.filter((hotel) => {
      if (hotel.name === searchInput.current.inputNode.defaultValue) {
        return true;
      } else {
        return null;
      }
        
    });
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
          <Fragment>
            <Typeahead
              filterBy={filterByCallback}
              id="custom-filtering-example"
              labelKey="name"
              options={options}
              ref={searchInput}
              placeholder="Search for a hotel..."
              renderMenuItemChildren={(option) => (
                <div onClick={viewHotel} key={option.id}>
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
                className="rounded-corners"
                variant="primary"
                type="submit"
              >
                View hotel
              </Button>
            </InputGroup.Append>
          </Fragment>
        </InputGroup>
      </Form>
    );
};

export default SearchDropDown;
