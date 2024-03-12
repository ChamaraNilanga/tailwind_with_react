import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";

import axios from "axios";
import TableComponent from "./TableComponent";
import UserTable from "./UserTable";
import { Alert } from "bootstrap";
import Notification from "./Notification";
import LoaderComponent from "./LoaderComponent";

function FormComponent() {
  const [usersList, setUsersList] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState("");
  const [errorType, setErrorType] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  let initialState = {
    name: "",
    email: "",
  };

  const [user, setUser] = useState(initialState);

  //   const { name, email } = user;

  const inputChangeHandler = (event) => {
    console.log("USER : ", user);
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const saveUser = async (e) => {
    if (id === "") {
      setLoader(true);
      const response = await axios.post("http://localhost:5000/users", user);
      console.log("RRRRRRR : ", response);
      setUsersList((prevData) =>
        [
          ...prevData,
          {
            ...user,
            name: user.name,
            email: user.email,
            id: response.data.id,
          },
        ].reverse()
      );
      setErrorType("success");
      setError("Added Successfully");
      setTimeout(() => {
        setErrorType("");
        setError("");
      }, 1000);
      setLoader(false);
    } else {
      axios.put(`http://localhost:5000/users/${id}`, user);
    }
  };

  // try {
  //     if (id > 0) {
  //       await axios.put('', payload);
  // 	 setList(response.data);
  //     } else {
  //       await axios.post('', payload);
  // 	 setList(response.data);
  //     }

  //   } catch (error) {
  //     console.error('Error :', error);
  //   }

  return (
    <div className="ml-10 mt-10">
      <h1 className="text-3xl font-bold underline mb-5">Form</h1>
      {error !== "" ? (
        <Notification errorType={errorType} message={error} />
      ) : null}
      {loader === true ? <LoaderComponent /> : null}
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              //   className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-500"
              id="grid-first-name"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => inputChangeHandler(e)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Email
            </label>
            <input
              //   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

              className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-500"
              id="grid-last-name"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => inputChangeHandler(e)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6"></div>
        <div className="flex flex-wrap -mx-3 mb-2"></div>
      </form>
      <ButtonComponent
        text={"SAVE"}
        onClick={saveUser}
        className={"font-bold py-2 px-4 rounded; bg-blue-500 text-white"}
      />
      <UserTable
        userList={usersList}
        setUserList={setUsersList}
        user={user}
        setName={setName}
        setEmail={setEmail}
        setId={setId}
      />
    </div>
  );
}

export default FormComponent;

// import React, { useState } from 'react';
// import axios from 'axios';
// import Notification from '../components/Notification';

// function AddContact() {
// 	let initialState = {
// 		name: '',
// 		email: '',
// 	};

// 	const [contact, setContact] = useState(initialState);
// 	const [notifyType, setNotifyType] = useState(null);
// 	const [errors, setErrors] = useState(null);

// 	const { name, email } = contact;

// 	const inputChangeHandler = (event) => {
// 		setContact({ ...contact, [event.target.name]: event.target.value });
// 	};

// 	const onSubmitForm = async (e) => {
// 		e.preventDefault();
// 		console.log(contact);

// 		await axios
// 			.post('http://localhost:5000/users', contact)
// 			.then((d) => {
// 				console.log(d);
// 				//setContacts(results);

// 				setErrors('Added Successfully');
// 				setNotifyType('success');

// 				setTimeout(() => {
// 					setNotifyType('');
// 					setErrors('');
// 				}, 1000);
// 			})
// 			.catch((error) => console.warn(error));
// 	};

// 	return (
// <div className="container my-5">
// <div className="row justify-content-center">
// <div className="col-md-6 mt-1">
// <div className="form-group">
// 						{errors && (
// <Notification
// 								errors={errors}
// 								notifyType={notifyType}
// 							/>
// 						)}
// </div>
// <h2 className="text-center mb-4" style={{ fontSize: 18 }}>
// 						Add Contacts
// </h2>

// 					<form onSubmit={(e) => onSubmitForm(e)}>
// <div className="form-group mb-3">
// <label>Name:</label>
// <input
// 								type="text"
// 								className="form-control"
// 								name="name"
// 								value={name}
// 								onChange={(e) => inputChangeHandler(e)}
// 							/>
// </div>

// 						<div className="form-group mb-3">
// <label>E-mail:</label>
// <input
// 								type="text"
// 								className="form-control"
// 								name="email"
// 								value={email}
// 								onChange={(e) => inputChangeHandler(e)}
// 							/>
// </div>

// 						<button type="submit" className="btn btn-primary">
// <i className="fa fa-fw fa-save"></i> Save
// </button>
// </form>
// </div>
// </div>
// </div>
// 	);
// }

// export default AddContact;
