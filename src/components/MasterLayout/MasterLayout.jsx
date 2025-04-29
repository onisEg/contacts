import React from "react";
import UserList from "../UserList/UserList";

export default function MasterLayout() {
  return (
    <>
      <div className=" bg-dark bg-opacity-25 col-md-8 border rounded-4 m-auto p-md-5">
        <div className="input-group input-group-lg px-4 pt-4">
          <input
            type="text"
            className="form-control rounded-pill"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Search by Name"
          />
        </div>
        <UserList />
      </div>
    </>
  );
}
