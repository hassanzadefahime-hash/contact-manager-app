import { Purple } from "../../helpers/colors";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
const SearchContact = () => {
  const { contactSearch } = useContext(contactContext);
  
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: Purple }}
      >
        <i className="fa fa-search"></i>
      </span>

      <input
        onChange={(event) => contactSearch(event.target.value)}
        dir="rtl"
        type="text"
        className="form-control"
        style={{ backgroundColor: "gray", borderColor: Purple }}
        placeholder="جستجو مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
export default SearchContact;
