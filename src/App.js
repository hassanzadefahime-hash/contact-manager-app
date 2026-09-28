import { useEffect } from "react";
import "./App.css";
import { contactContext } from "./context/contactContext";
import { useImmer } from "use-immer";
import {
  Navbar,
  Contacts,
  ViewContact,
  EditContact,
  AddContact,
} from "./components";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import _ from "lodash";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./sevices/contactService";
import { confirmAlert } from "react-confirm-alert";
import {
  CurrentLine,
  Purple,
  Yellow,
  Foreground,
  Red,
  Green,
} from "./helpers/colors";

function App() {
  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [groups, setGrouos] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [contact, setContact] = useImmer({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",

    job: "",
    group: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setContacts(contactData);
        setFilteredContacts(contactData);
        setGrouos(groupData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading((draft) => !draft);
      // await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);
      console.log(data);
      if (status === 201) {
        // toast("مخاطب با موفقیت ساخته شد");

        toast.success("مخاطب با موفقیت ایجاد شد");

        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setContact({});

        setLoading((prevLoading) => !prevLoading);

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      // setErrors(err.inner);
      setLoading((draft) => !draft);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CurrentLine,
              border: `1px solid ${Purple}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
            <p style={{ color: Foreground }}>
              مطمِنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              className="btn mx-2"
              style={{ backgroundColor: Green }}
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: Red }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      const allContacts = [...contacts];

      setContacts((draft) => draft.filter((c) => c.id !== contactId));

      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));
      const { status } = await deleteContact(contactId);
      toast.error("مخاطب حذف شد.")
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  // let filterTimeOut ;
  const contactSearch = _.debounce((query) => {
    // clearTimeout(filterTimeOut)

    if (!query) return setFilteredContacts([...contacts]);

    // filterTimeOut=setTimeout(() => {

    setFilteredContacts((draft) => {
      draft.filter((contact) => {
        return contact.fullname.includes(query.toLowerCase());
      });
    });
    // }, 1000);
  }, 1000);

  return (
    <contactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContacts,
        contactSearch,
        filteredContacts,
        groups,
        onContactChange,
        contacts,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        setFilteredContacts,
      }}
    >
      <div className="App">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/add" element={<AddContact />} />
        </Routes>
      </div>
    </contactContext.Provider>
  );
}

export default App;
