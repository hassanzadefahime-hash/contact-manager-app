import { Green, Purple } from "../../helpers/colors";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { contactSchema } from "../../contactValidation";

import { Formik, Form, Field, ErrorMessage } from "formik";
const AddContact = () => {
  const { loading, groups,  createContact} =
    useContext(contactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              alt=""
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
              height="400px"
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: Green }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Green }} />

              <div className="row mt-5">
                <div className="col-md-4">
                  <Formik
                    initialValues={{
                      fullname: "",
                      photo: "",
                      mobile: "",
                      email: "",
                      job: "",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      createContact(values);
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
                        <Field name="group" as="select" className="form-control" >
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
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default AddContact;
