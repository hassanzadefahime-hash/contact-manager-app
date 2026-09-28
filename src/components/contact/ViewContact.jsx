import { useEffect, useState } from "react";
import { CurrentLine, Cyan, Purple } from "../../helpers/colors";
import Spinner from "../Spinner";
import { Link, useParams } from "react-router-dom";
import { getContact, getGroup } from "../../sevices/contactService";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
const ViewContact = () => {
  const { loading, setLoading } = useContext(contactContext);

  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const { contactId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setState({
          contact: contactData,
          group: groupData,
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { contact, group } = state;
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: Cyan }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em ", backgroundColor: CurrentLine }}
              >
                <div className="col-md-3">
                  <img
                    src=""
                    alt=""
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${Purple}` }}
                  />
                </div>
                <div className="col-md-9">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-dark">
                      نام و نام خانوادگی:
                      <span className="fw-bold">{contact.fullname}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      شماره موبایل:
                      <span className="fw-bold">{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      ایمیل :<span className="fw-bold">{contact.email}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      شغل :<span className="fw-bold">{contact.job}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      گروه :<span className="fw-bold">{group.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row my-2">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <Link
                    to={"/contacts"}
                    className="btn"
                    style={{ backgroundColor: Purple }}
                  >
                    برگشت به صفحه اصلی
                  </Link>
                </div>
              </div>
            </section>
          }
        </>
      )}
    </>
  );
};
export default ViewContact;
