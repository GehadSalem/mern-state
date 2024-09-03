import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact.jsx";
import { CiEdit } from "react-icons/ci";
import sold from "../assets/sold.png";
import rented from "../assets/rented.png";
import { FiEdit } from "react-icons/fi";

export default function Listing() {
  SwiperCore.use(Navigation);
  const params = useParams();
  const listingId = params.id;
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchingListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchingListing();
  }, []);

  console.log(loading);

  return (
    <div className="">
      {loading && <Loading />}
      {error && (
        <p className="text-center my-7 text-2xl">Something Went wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
                {listing.status === "deactivated" &&
                  listing.type === "rent" && (
                    <img
                      src={rented}
                      alt="rented"
                      className="absolute top-0 right-1"
                    />
                  )}
                {listing.status === "deactivated" &&
                  listing.type === "sale" && (
                    <img
                      src={sold}
                      alt="Sold"
                      className="absolute top-28 left-15 bg-emerald-50 bg-opacity-90 rounded-3xl w-full scale-90"
                    />
                  )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">
                {listing.name} - $
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </p>

              {currentUser && listing.userRef._id === currentUser._id && (
                <p
                  className="text-lg text-lime-50 p-3 rounded-lg shadow-md bg-emerald-900 flex items-center w-20 justify-between hover:scale-105 transition-scale duration-300 cursor-pointer"
                  onClick={() => navigate(`/update-listing/${listingId}`)}
                >
                  Edit <FiEdit />
                </p>
              )}
            </div>

            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-700">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            <p className="border-t flex items-center text-sm text-emerald-600 truncate p-3 w-full">
              <CiEdit className="text-2xl mt-1 mr-2" /> published by
              <span className="pl-2 font-semibold">{listing.userRef.userName}</span>
            </p>
            {currentUser &&
              listing.userRef._id === currentUser._id &&
              !contact && (
                <Link
                  className="bg-green-700 text-white mt-7 p-3 rounded-lg w-96 m-auto uppercase text-center  hover:scale-105 transition-scale duration-300 cursor-pointer "
                  to={"/create-listing"}
                >
                  Create Listing
                </Link>
              )}
            {currentUser &&
              listing.userRef._id !== currentUser._id &&
              !contact &&
              listing.status === "active" && (
                <>
                  <button
                    onClick={() => setContact(true)}
                    className="bg-emerald-700 mt-7 text-white  w-96 m-auto rounded-lg uppercase  hover:scale-105 transition-scale duration-300 cursor-pointer p-3"
                  >
                    Contact Landlord
                  </button>
                </>
              )}

            {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </div>
  );
}
