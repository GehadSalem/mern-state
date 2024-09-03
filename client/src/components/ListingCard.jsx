import React from "react";
import { Link } from "react-router-dom";
import {
    MdLocationOn
  } from "react-icons/md";
  import { CiEdit } from "react-icons/ci";
  import sold from "../assets/sold.png";
  import rented from "../assets/rented.png";

export default function ListingCard({ listing }) {
    console.log(listing);
    
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link className="relative" to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
                  {listing.status === "deactivated" &&
                  listing.type === "sale" && (
                    <img src={sold} alt="Sold" className="absolute top-9 bg-emerald-50 bg-opacity-90 -rotate-12 rounded-3xl scale-90" />
                  )}
                  {listing.status === "deactivated" &&
                  listing.type === "rent" && (
                    <img src={rented} alt="rented" className="absolute w-60 top-0 " />
                  )}
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className=" truncate text-lg font-semibold text-slate-700">
          {listing.name}  
        </p>
        
        <div className="flex items-center gap-2">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-emeraled-600 truncate w-full">{listing.address}</p>
        </div>
        <p className="text-sm text-emeraled-600 line-clamp-2">{listing.description}</p>
        <p className="text-slate-500  mt-2 font-semibold">
            ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
        </p>
        <div className=" flex text-slate-500 gap-6">
            <p className="">{listing.bedrooms > 1 ? listing.bedrooms + ' ' + 'Beds' : listing.bedrooms + ' ' + 'Bed'}</p>
            <p className="">{listing.bathrooms > 1 ? listing.bathrooms + ' ' + 'Baths' : listing.bathrooms + ' ' + 'Bath'}</p>
        </div>
        <p className="border-t flex items-center  text-sm text-emerald-600 truncate p-3 w-full"> <CiEdit className="text-2xl mt-1 mr-2" /> published by <span className="font-semibold pl-2">{listing.userRef.userName}</span></p>
      </div>
    </div>
  );
}
