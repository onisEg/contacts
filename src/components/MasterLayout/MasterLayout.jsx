import React from "react";
import UserList from "../UserList/UserList";

export default function MasterLayout() {
  return (
    <>
      <div className=" bg-dark bg-opacity-25 col-md-8 border rounded-4 m-auto p-md-5">
        
        <UserList />
      </div>
    </>
  );
}
