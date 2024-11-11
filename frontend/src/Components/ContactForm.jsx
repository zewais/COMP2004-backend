export default function ContactForm({
  formData,
  handleOnChange,
  handleOnSubmit,
}) {
  return (
    <div className="contact-form">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          placeholder="Email"
        />
        <br />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleOnChange}
          placeholder="Phone"
        />
        <br />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleOnChange}
          placeholder="Address"
        />
        <br />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleOnChange}
          placeholder="Image URL"
        />
        <br />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}
