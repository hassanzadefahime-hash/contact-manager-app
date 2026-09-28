import { createContext } from "react";

export const contactContext = createContext({
  loading: false,
  setLoading: () => {},
  getGroups: () => {},
  createContactForm: () => {},
  contact: {},
  contacts: [],
  setContacts: () => {},
  filteredContacts: [],
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
  setFilteredContacts: () => {},
});
