export default function ContactCard({ contact, handleDelete, handleEdit }) {
  return (
    <div key={contact._id} className="contact-card">
      <h2>{contact.name}</h2>
      <p>{contact.contact.email}</p>
      <p>{contact.contact.phone}</p>
      <p>{contact.contact.address}</p>
      <img src={contact.image} alt="" height="100px" />
      <br />
      <button onClick={() => handleDelete(contact._id)}>Delete</button>
      <button onClick={() => handleEdit(contact)}>Edit</button>
    </div>
  );
}
