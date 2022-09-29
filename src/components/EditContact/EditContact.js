import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../../context/ContactsCrudContext";

const EditContact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(props);

  const firebaseKey = Object.keys(location.state.contact)[0];
  const contactValue = Object.values(location.state.contact)[0];
  const {id, name, mobile, email} = contactValue;

  const[newName, setNewName] =useState(name);
  const[newMobile, setNewMobile] = useState(mobile);
  const[newEmail, setNewEmail] = useState(email);
  const {updateContactHandler} = useContactsCrud();

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newMobile === "" || newEmail === "") {
      alert("Please fill in all fields to continue.");
        return;
      };
     
     updateContactHandler(firebaseKey,
      { 
        id,
        name: newName, 
        mobile: newMobile, 
        email: newEmail
      });
     setNewName("");
     setNewMobile("");
     setNewEmail("");
     navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}  >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName( e.target.value )}
          />
        </div>
        <div className="field">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={newMobile}
            onChange={(e) => setNewMobile( e.target.value )}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail( e.target.value )}
          />
        </div>
        <button className="ui button teal">Update</button>
      </form>
    </div>
  );
}

export default EditContact