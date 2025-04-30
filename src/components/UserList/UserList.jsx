import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddContactModal from "../ContactModal/AddContactModal";
import ContactCard from "../ContactCard/ContactCard";
import AddContactButton from "../AddContactButton/AddContactButton";
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
      <div className="input-group input-group-lg px-4 pt-4">
        <input
          type="text"
          className="form-control rounded-pill"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* add contact btn  */}
      <AddContactButton
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
      />

      <div
        className=" p-4 w-100  custom-scroll"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {filteredContacts.map((contact, index) => (
          <div key={contact.id} className="mb-1">
            <ContactCard
              contact={contact}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            {index !== contacts.length - 1 && (
              <hr className="border border-light border-1 opacity-75 w-100" />
            )}
          </div>
        ))}
      </div>
      {/* Modal */}
      {showModal && (
        <AddContactModal
          newContact={newContact}
          setNewContact={setNewContact}
          editMode={editMode}
          handleSave={handleSave}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
