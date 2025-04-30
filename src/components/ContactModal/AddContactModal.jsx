import React from "react";

export default function AddContactModal({
  newContact,
  setNewContact,
  editMode,
  handleSave,
  setShowModal,
}) {
  return (
    <div
      className="modal d-block rounded-4"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={() => setShowModal(false)}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <form
            className="modal-body text-center p-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div>
              <input
                type="file"
                accept="image/jpeg, image/jpg"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const fileType = file.type;
                    if (fileType === "image/jpeg" || fileType === "image/jpg") {
                      const imageURL = URL.createObjectURL(file);
                      setNewContact({ ...newContact, picture: imageURL });
                    } else {
                      alert("Only JPG or JPEG files are allowed!");
                    }
                  }
                }}
              />

              <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
                <img
                  src={
                    newContact.picture || "https://avatar.iran.liara.run/public"
                  }
                  alt="Upload"
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </label>
            </div>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <h5 className="mb-4 fs-6 text-muted fw-light">Upload Photo</h5>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="First Name"
                  value={newContact.firstName}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="Last Name"
                  value={newContact.lastName}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <input
                  type="email"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="Email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                style={{ background: "#d9d9d9" }}
                className="btn rounded-4 px-4 fs-6 btn-xl fw-light text-dark"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: editMode ? "#FFC107" : "#1BB0F0",
                  border: "none",
                }}
                className="btn btn-primary rounded-4 px-5 fs-6 btn-lg fw-light"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
