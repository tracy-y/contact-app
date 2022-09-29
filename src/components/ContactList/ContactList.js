import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useContactsCrud } from '../../context/ContactsCrudContext';
import SearchBar from './components/SearchBar/SearchBar';
import ContactCard from './components/ContactCard/ContactCard';

const ContactList = () => {
  const {retrieveContacts, searchTerm, contacts, searchResults } = useContactsCrud();

  useEffect(() => {
    retrieveContacts();
  }, []);

  const renderContactList = (
    searchTerm.length < 1 ? contacts : searchResults
    ).map((contact) => {

     const firebasetKey = Object.keys(contact)[0];
     const contactValue = Object.values(contact)[0];

    return (
      <ContactCard
        contactValue={contactValue}
        firebasetKey={firebasetKey}
        id={contactValue.id}
        contact={contact}
        key = {firebasetKey}
      />
    );
  });

  return (
    <div className="main"> 
    <h2>
      Contact list
      <Link to="/add" >
        <button className="ui button teal " style={{float: "right"}}>Add Contact</button>
      </Link>
    </h2>
    <SearchBar />
    <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;