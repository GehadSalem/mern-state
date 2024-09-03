import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../store/pages/userSlice.js";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import  sold  from "../assets/sold.png";
import rented from "../assets/rented.png"
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationAction, setConfirmationAction] = useState(() => () => {}); // Default to an empty function

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleToggle = async (listingId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "deactivated" : "active";

      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // إرسال الحالة الجديدة
      });

      const data = await res.json();

      if (data.success === false) {
        console.error(data.message);
        return;
      }

      // تحديث الحالة في الواجهة الأمامية
      setUserListings((prev) =>
        prev.map((listing) =>
          listing._id === listingId
            ? { ...listing, status: newStatus }
            : listing
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  // const handleToggle = async (listingId, currentStatus) => {
  //   try {
  //     const newStatus = currentStatus === 'active' ? 'deactivated' : 'active';
  //     const res = await fetch(`/api/listing/update/${listingId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ status: newStatus }),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       console.error(data.message);
  //       return;
  //     }
  //     setUserListings((prev) =>
  //       prev.map((listing) =>
  //         listing._id === listingId ? { ...listing, status: newStatus } : listing
  //       )
  //     );
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

    const showConfirmationDialog = (message, action) => {
    setConfirmationMessage(message);
    setConfirmationAction(() => action);
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    confirmationAction();
    setShowConfirmation(false);
  };

  const cancelAction = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 max-w-lg mx-auto relative">
      <div className="w-full">
      {loading && <Loading />}
      <h1 className="text-emerald-900 text-3xl text-center font-semibold my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 hover:scale-105 transition-scale duration-300"
          src={formData?.avatar || currentUser?.avatar}
          alt=""
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (Image must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-emerald-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded Successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="userName"
          defaultValue={currentUser?.userName}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-emerald-50 text-emerald-900 border-emerald-900 border p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 "
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={() => showConfirmationDialog("Are you sure you want to delete your account?", handleDeleteAccount)}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 mt-5">User updated successfully!</p>
      )}
      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error showing listings" : ""}
      </p>

      {userListings.length > 0 && (
        <div className="flex flex-col gap-4 pb-10">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link className="relative" to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
                {listing.status === "deactivated" &&
                  listing.type === "sale" && (
                    <img src={sold} alt="Sold" className="absolute top-5 bg-emerald-50 bg-opacity-90 -rotate-12 rounded-3xl scale-90" />
                  )}
                  {listing.status === "deactivated" &&
                  listing.type === "rent" && (
                    <img src={rented} alt="rented" className="absolute top-1 right-1" />
                  )}
              </Link>
              <Link
                className="text-emerald-700 font-semibold flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              
              <button
                  onClick={() => handleToggle(listing._id, listing.status)}
                  className={`p-1 rounded-lg ${
                    listing.status === "active" ? "bg-green-600" : "bg-gray-600"
                  } text-white`}
                >
                  {listing.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <div className="flex flex-col gap-3 items-center">
              <button
                  onClick={() =>
                    showConfirmationDialog(
                      "Are you sure you want to delete this listing?",
                      () => handleListingDelete(listing._id)
                    )
                  }
                  className='text-red-700 '
                >
                  <MdDelete />
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700"><FiEdit /></button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      
      {showConfirmation && (
        <div className=" absolute bg-emerald-900 rounded-lg opacity-95 shadow-2xl p-10">
          <div className="">
          <p className="text-emerald-50">{confirmationMessage}</p>
          <div className="flex gap-4 mt-3">
            <button
              onClick={confirmAction}
              className="bg-red-600 text-white p-2 rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={cancelAction}
              className="bg-gray-300 text-black p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
