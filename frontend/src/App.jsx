import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Protected route
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginRegister from "./pages/LoginRegister";

// User pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"; // ✅ ADD THIS
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import AddFood from "./admin/AddFood";
import ManageFood from "./admin/ManageFood";
import AllOrders from "./admin/AllOrders";

const App = () => {
  return (
    <Routes>
      {/* ---------- ROUTES WITH NAVBAR & FOOTER ---------- */}
      <Route element={<Layout />}>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginRegister />} />

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route element={<ProtectedRoute />}>

          {/* USER ROUTES */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* ✅ NEW */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-food" element={<AddFood />} />
          <Route path="/admin/manage-food" element={<ManageFood />} />
          <Route path="/admin/orders" element={<AllOrders />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default App;


