import { Link } from "react-router-dom";
import { CurrentLine, Orange, Pink } from "../../helpers/colors";
import Spinner from "../Spinner";
import Contact from "./Contact";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
const Contacts = () => {
  const {  loading, deleteContact , filteredContacts } = useContext(contactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end mt-3">
                <Link
                  to={"/contacts/add"}
                  className="btn mx-2"
                  style={{ backgroundColor: Pink }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  key={c.id}
                  contact={c}
                  deleteContact={() => deleteContact(c.id, c.fullname)}
                />
              ))
            ) : (
              <div
                className="text-center py-5 "
                style={{ backgroundColor: CurrentLine }}
              >
                <p className="h3" style={{ color: Orange }}>
                  مخاطب یافت نشد ...
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="پیدا نشد"
                  className="w-25"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
