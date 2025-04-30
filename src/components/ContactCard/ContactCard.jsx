import React from "react";

export default function ContactCard({ contact, handleEdit, handleDelete }) {
  return (
    <div className="d-flex align-items-center w-100">
      <div className="me-3" style={{ width: "100px" }}>
        <img
          src={contact.picture || "https://avatar.iran.liara.run/public"}
          alt={contact.name}
          className="rounded-circle"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="w-100 text-light">
        <h5 className="mb-0 text-capitalize">
          {contact.firstName} {contact.lastName}
        </h5>
        <small>{contact.phone}</small>
      </div>
      <div className="d-flex gap-2">
        <button
          className="btn bg-white border-0 shadow-sm rounded-circle d-flex align-items-center justify-content-center text-warning"
          style={{ width: "45px", height: "45px" }}
          onClick={() => handleEdit(contact)}
        >
          <i className="bi bi-pencil"></i>
        </button>
        <button
          className="btn bg-white border-0 shadow-sm rounded-circle d-flex align-items-center justify-content-center text-danger"
          style={{ width: "45px", height: "45px" }}
          onClick={() => handleDelete(contact.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
