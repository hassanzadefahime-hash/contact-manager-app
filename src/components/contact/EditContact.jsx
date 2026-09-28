import { useEffect } from "react";
import { Orange, Purple } from "../../helpers/colors";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../sevices/contactService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../contactValidation";
import { useImmer } from "use-immer";
const EditContact = () => {
  const { setLoading, loading, groups, setContacts, setFilteredContacts } =
    useContext(contactContext);
  const [contact, setContact] = useImmer({});
  const navigate = useNavigate();
  const { contactId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading(true);

      const { data, status } = await updateContact(values, contactId);

      setLoading(false);
      if (status === 200) {
        setLoading(false);

        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });

        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });

        navigate("/contacts");
        toast.success("مخاطب با موفقیت بروزرسانی شد.");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
console.log(contact)
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: Orange }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Orange }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={{
                      fullname: contact.fullname,
                      photo: contact.photo,
                      mobile: contact.mobile,
                      email: contact.email,
                      job: contact.job,
                      group: contact.group,
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                      </div>
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mb-2">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                          name="photo"
                        />
                      </div>
                      <ErrorMessage
                        name="photo"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mb-2">
                        <Field
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                          name="mobile"
                        />
                      </div>
                      <ErrorMessage
                        name="mobile"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mb-2">
                        <Field
                          type="email"
                          className="form-control"
                          placeholder="ایمیل"
                          name="email"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mb-2">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="شغل"
                          name="job"
                        />
                      </div>
                      <ErrorMessage
                        name="job"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="group"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: Purple }}
                          value="ساخت مخاطب"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: Comment }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    alt=""
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${Purple}` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                alt=""
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default EditContact;
