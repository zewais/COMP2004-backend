// import React from "react";

export default function ContactForm({
  isEditing,
  formData,
  handleOnChange,
  handleOnSubmit,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <input
            type="text"
            name="name"
            {
              // If isEditing is true, then don't register the input fields
              ...(isEditing
                ? {}
                : register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Name should contain only alphabets",
                    },
                  }))
            }
            value={formData.name}
            onChange={handleOnChange}
            placeholder="Name"
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            {...(isEditing
              ? {}
              : register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "Invalid email address",
                  },
                }))}
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Email"
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            {...(isEditing
              ? {}
              : register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number should be 10 digits",
                  },
                }))}
            value={formData.phone}
            onChange={handleOnChange}
            placeholder="Phone"
          />
          {errors.phone && (
            <span style={{ color: "red" }}>{errors.phone.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="address"
            {...(isEditing
              ? {}
              : register("address", {
                  required: "Address is required",
                }))}
            value={formData.address}
            onChange={handleOnChange}
            placeholder="Address"
          />
          {errors.address && (
            <span style={{ color: "red" }}>{errors.address.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>
        <button type="submit">
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
}
