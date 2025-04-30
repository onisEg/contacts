import React from "react";

export default function AddContactButton({ onClick }) {
  return (
    <div className="addBtn d-flex justify-content-end pt-4 px-4">
      <button
        className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill border-0 shadow-sm"
        style={{
          backgroundColor: "#1BB0F0",
          color: "#fff",
          fontWeight: 500,
          fontSize: "16px",
          transition: "all 0.3s",
        }}
        onClick={onClick}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#139ecf")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1BB0F0")}
      >
        <i className="fa-solid fa-plus mx-1"></i> Add New Contact
      </button>
    </div>
  );
}
