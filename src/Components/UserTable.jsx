import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonComponent from "./ButtonComponent";

function UserTable(props) {
  const { userList, setUserList, setName, setEmail, setId } = props;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        console.log("RESPONSE : ", response);
        setUserList(response.data.reverse());
      })
      .catch((error) => console.warn(error));
  };

  const deleteUser = async (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((response) => {
        console.log(response);
        setUserList(userList.filter((item) => item.id !== id));
      })
      .catch((error) => console.warn(error));
  };

  const setData = (name, email, id) => {
    setEmail(email);
    setName(name);
    setId(id);
  };

  return (
    <div>
      <table className="w-[70%] mt-10">
        <thead className="bg-slate-300">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="w-[150px]">Action</th>
          </tr>
        </thead>
        {userList.map((user) => (
          <tbody>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div className="flex">
                  <ButtonComponent
                    text={"DELETE"}
                    className={
                      "font-bold py-1 px-2 rounded; bg-red-500 text-white"
                    }
                    onClick={() => deleteUser(user.id)}
                  />
                  <ButtonComponent
                    text={"EDIT"}
                    className={
                      "font-bold py-1 px-2 rounded; bg-green-500 text-white ml-5"
                    }
                    onClick={() => setData(user.name, user.email, user.id)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default UserTable;
