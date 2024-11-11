export default function ContactCard({ contact }) {
  return (
    <div key={contact._id}>
      <h2>{contact.name}</h2>
      <p>{contact.contact.email}</p>
      <p>{contact.contact.phone}</p>
      <p>{contact.contact.address}</p>
      <img src={contact.image} alt="" height="100px" />
    </div>
  );
}
