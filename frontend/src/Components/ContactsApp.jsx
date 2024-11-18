///////////////////////////////////////////////////////////////////////////////////
// Importing Files
import axios from "axios";
import { useEffect, useState } from "react";
import ContactsContainer from "./ContactsContainer";
import ContactForm from "./ContactForm";
import { useForm } from "react-hook-form";

export default function ContactsApp() {
  //////////////////////////////////////////
  // States
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
  //////////////////////////////////////////
  // useEffect
  useEffect(() => {
    handleContactsDB();
  });
  //////////////////////////////////////////
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //////////////////////////////////////////
  // Handlers
  // Fetching data from the database
  const handleContactsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contacts");
      setContactData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handling form data
  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault; // YOU HAVE TO REMOVE THE BRACKETS FOR THIS TO WORK!!
    try {
      if (isEditing) {
        // If isEditing is true, then update the contact
        try {
          await handleUpdate(formData._id); // Update the contact
          await setIsEditing(false); // Set isEditing to false
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
        // If isEditing is false, then add the contact
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

  // Handling edit contact
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

  // Handling update contact in the database by id
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

  // Handling delete contact from the database by id
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
  //////////////////////////////////////////
  // Render

  return (
    <div className="contacts-app">
      <h1>Contacts</h1>
      <ContactForm
        formData={formData}
        handleOnChange={handleOnchange}
        handleOnSubmit={handleOnSubmit}
        isEditing={isEditing}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      <p style={{ color: "green" }}>{postResponse}</p>
      <ContactsContainer
        contactData={contactData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
