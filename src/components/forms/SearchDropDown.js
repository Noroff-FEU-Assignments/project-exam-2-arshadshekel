import { Typeahead } from "react-bootstrap-typeahead";
import { useState, Fragment, useEffect } from "react";
import { API } from "../../constants/Api";

const SearchDropDown = () => {

  const [options, setOptions] = useState([]);
    
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
   

  const filterByCallback = (option, props) =>  option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;
    
  return (
    <Fragment>
      <Typeahead
        filterBy={filterByCallback}
        id="custom-filtering-example"
        labelKey="name"
        options={options}
        placeholder="Search for a hotel..."
        renderMenuItemChildren={(option) => (
         <Fragment>
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
        </Fragment>
        )}
      />
    </Fragment>
  );
};

export default SearchDropDown


        