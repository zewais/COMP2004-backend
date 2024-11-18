import axios from "axios";
import { useEffect, useState } from "react";
import ContactsContainer from "./ContactsContainer";
import ContactForm from "./ContactForm";

export default function ContactsApp() {
  const [contactData, setContactData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleContactsDB();
  });

  const handleContactsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contacts");
      setContactData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        try {
          await handleUpdate(formData._id);
          await setIsEditing(false);
          await setFormData({
            name: "",
            email: "",
            phone: "",
            image: "",
            address: "",
          });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        await axios
          .post("http://localhost:3000/add-contact", formData)
          .then((response) => {
            setPostResponse(response.data.message);
          });
        setFormData({ name: "", email: "", phone: "", image: "", address: "" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/contacts/${id}`)
        .then((response) => {
          setPostResponse(response.data.message);
        });
      // handleContactsDB();
      // setPostResponse("Contact deleted successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (contact) => {
    setIsEditing(true);
    setFormData({
      name: contact.name,
      email: contact.contact.email,
      phone: contact.contact.phone,
      address: contact.contact.address,
      image: contact.image,
      _id: contact._id,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios
        .patch(`http://localhost:3000/contacts/${id}`, formData)
        .then((response) => {
          setPostResponse(response.data.message);
        });
      // handleContactsDB();
      // setPostResponse("Contact updated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="contacts-app">
      <h1>Contacts</h1>
      <ContactForm
        formData={formData}
        handleOnChange={handleOnchange}
        handleOnSubmit={handleOnSubmit}
        isEditing={isEditing}
      />
      <p>{postResponse}</p>
      <ContactsContainer
        contactData={contactData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
