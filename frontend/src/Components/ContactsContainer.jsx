import ContactCard from "./ContactCard";
export default function ContactsContainer({ contactData }) {
  return (
    <div className="contacts-app">
      {contactData.map((contact) => (
        <ContactCard key={contact._id} contact={contact} />
      ))}
    </div>
  );
}
