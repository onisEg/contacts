import React from "react";
import UserList from "../UserList/UserList";

export default function MasterLayout() {
  return (
    <>
      <div
        className="col-md-8 border rounded-4 m-auto p-md-5"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <UserList />
      </div>
    </>
  );
}
