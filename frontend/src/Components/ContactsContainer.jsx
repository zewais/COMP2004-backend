import ContactCard from "./ContactCard";
export default function ContactsContainer({
  contactData,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="contacts-app">
      {contactData.map((contact) => (
        <ContactCard
          key={contact._id}
          contact={contact}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}
