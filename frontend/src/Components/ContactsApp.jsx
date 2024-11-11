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
      await axios
        .post("http://localhost:3000/add-contact", formData)
        .then((response) => {
          setPostResponse(response.data.message);
        });
      setFormData({ name: "", email: "", phone: "", image: "", address: "" });
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
      />
      <p>{postResponse}</p>
      <ContactsContainer contactData={contactData} />
    </div>
  );
}
