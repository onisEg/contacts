import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const baseURL = `https://dummyapi.io/data/v1/user`;
const appId = "64fc4a747b1786417e354f31";

export default function UserList() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEdit = (contact) => {
    setNewContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      picture: contact.picture,
    });
    setEditId(contact.id);
    setEditMode(true);
    setShowModal(true);
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${baseURL}`, {
        headers: {
          "app-id": appId,
        },
      });
      setContacts(response.data.data);
      console.log(response.data.data);

      toast.success("Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        // edite user
        await axios.put(`${baseURL}/${editId}`, newContact, {
          headers: {
            "app-id": appId,
          },
        });
        toast.success("User Updated Successfully!");
      } else {
        // add new user
        await axios.post(`${baseURL}/create`, newContact, {
          headers: {
            "app-id": appId,
          },
        });
        toast.success("User Added Successfully!");
      }

      setShowModal(false);
      fetchContacts();
      setEditMode(false);
      setNewContact({
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
      });
    } catch (error) {
      if (error.response?.data?.data) {
        const errors = error.response.data.data;
        const message = Object.entries(errors)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");

        toast.error(message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, {
        headers: {
          "app-id": appId,
        },
      });

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
      console.log(`Deleted contact with id: ${id}`);
      toast.success("user Deleted successfully!");
      fetchContacts();
      setNewContact({
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <>
      <div className="addBtn d-flex justify-content-end pt-4 px-4 ">
        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill border-0 shadow-sm"
          style={{
            backgroundColor: "#1BB0F0",
            color: "#fff",
            fontWeight: 500,
            fontSize: "16px",
            transition: "all 0.3s",
          }}
          onClick={() => {
            setNewContact({
              firstName: "",
              lastName: "",
              email: "",
              picture: "",
            });
            setEditMode(false);
            setShowModal(true);
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#139ecf")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#1BB0F0")
          }
        >
          <i className="fa-solid fa-plus mx-1"></i> Add New Contact
        </button>
      </div>
      <div
        className=" p-4 w-100  custom-scroll"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {contacts.map((contact, index) => (
          <div key={contact.id} className=" mb-1">
            <div className="d-flex align-items-center w-100 ">
              <div
                className=" me-3"
                style={{
                  width: "100px",
                }}
              >
                <img
                  src={
                    contact.picture || `https://avatar.iran.liara.run/public`
                  }
                  alt={contact.name}
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className=" w-100 text-light">
                <h5 className="mb-0 text-capitalize">
                  {contact.firstName} {contact.lastName}
                </h5>
                <small className="">{contact.phone}</small>
              </div>
              <div className="d-flex gap-2 ">
                <button
                  className="btn bg-white border-0 shadow-sm rounded-circle d-flex align-items-center justify-content-center text-warning"
                  style={{ width: "45px", height: "45px" }}
                  onClick={() => handleEdit(contact)}
                >
                  <i className="bi bi-pencil "></i>
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
            {index !== contacts.length - 1 && (
              <hr className="border border-light border-1 opacity-75 w-100"></hr>
            )}
          </div>
        ))}
      </div>
      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
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
                {/* Upload Image Section */}
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
                        if (
                          fileType === "image/jpeg" ||
                          fileType === "image/jpg"
                        ) {
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
                        newContact.picture ||
                        "https://avatar.iran.liara.run/public"
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
                {/* first Name */}
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
                  {/* Last Name*/}
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
                {/* upload img */}
                <div className="row mb-4">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-pill"
                      placeholder="Email"
                      value={newContact.email}
                      onChange={(e) =>
                        setNewContact({ ...newContact, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    style={{ background: "#d9d9d9" }}
                    className="btn  rounded-4 px-4 fs-6 btn-xl fw-light text-dark  "
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: editMode ? "#FFC107" : "#1BB0F0", // أصفر لو تعديل، أزرق لو إضافة
                      border: "none",
                    }}
                    className="btn btn-primary rounded-4 px-5 fs-6 btn-lg fw-light"
                    onClick={handleSave}
                  >
                    {editMode ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
