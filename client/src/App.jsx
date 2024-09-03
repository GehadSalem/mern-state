import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header.jsx";
import PrivetRoute from "./components/PrivetRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Listing from "./pages/Listing.jsx";
import Search from "./pages/Search.jsx";
import Listings from "./pages/Listings.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listings" element={<Listings />} />

        <Route element={<PrivetRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
