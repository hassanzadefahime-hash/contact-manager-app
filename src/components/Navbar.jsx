import { Background, Purple } from "../helpers/colors";
import SearchContact from "./contact/SearchContact";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expend-sm shadow-lg"
      // style={{ backgroundColor: Colorfull }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: Purple }}></i>{" "}
              اپلیکیشن مدیریت <span style={{ color: Purple }}>مخاطبین</span>
            </div>
          </div>
          <div className="col">
            {location.pathname === "/contacts" ? <SearchContact /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
