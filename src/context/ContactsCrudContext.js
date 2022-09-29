import {createContext, useContext, useState} from "react";
import api from '../api/contacts';
import { v4 as uuid } from 'uuid';

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
   const [contacts, setContacts] = useState([]);
   const [contact, setContact] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] =useState([]);
 

//RetrieveContacts
const retrieveContacts = async () => {
  const response = await api.get("/contacts.json");

  if (response.data) {
  // setContacts(Object.values(response.data));
   const withNestedKeys = Object.entries(response.data).map
   ((entry) => {
     return { [entry[0]]: entry[1] };
   });
   setContacts(withNestedKeys);
  } 
};

//AddContact
const addContactHandler = async (contact) => {
  const request= {
    id: uuid(),
    ...contact,
  };

const response = await api.post("/contacts.json", request);

setContacts([...contacts, response.data]);
};

//Edit and update Contact
const updateContactHandler = async (firebaseKey, contactValue) => {

  const response = await api.put(`/contacts/${firebaseKey}.json`, contactValue)
  
  const{ id } = response.data;   

  setContacts(
    contacts.map(( contact ) => {
      return Object.values(contact)[0].id === id ? 
      {firebaseKey: {...response.data} } : contact;
  }));
};

//DeleteContact
const removeContactHandler = async (
    firebaseKey, 
    contactValue
    ) => {
  await api.delete(`/contacts/-${firebaseKey}.json`);

   const newContactList = contacts.filter(( contact ) => {
    return Object.values(contact)[0].id !== contactValue.id;
   });

   setContacts(newContactList);
}

// SearchBar - searchFunctionality
const searchHandler = (searchTerm) => {
  setSearchTerm(searchTerm);
  if(searchTerm !== ""){
   const newContactList = contacts.filter((contact) => {
     const contactValue = Object.values(contact)[0];
    //  const {email, name, mobile} = contactValue;

     return Object.values(contactValue)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
   });
   setSearchResults(newContactList);
  }else{
   setSearchResults(contacts);
  }
};

    const value = {
        contact, 
        setContact,
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retrieveContacts,
        addContactHandler,
        updateContactHandler,
        removeContactHandler,
    }

  return <contactsCrudContext.Provider value = {value}>
    {children}
  </contactsCrudContext.Provider>

}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
}
