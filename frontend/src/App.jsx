import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import RoleRoute from "./components/RoleRoute";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Discover from "./pages/Discover";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Restaurants from "./pages/Restaurants";
import HowItWorks from "./pages/HowItWorks";
import Reviews from "./pages/Reviews";
import HelpCenter from "./pages/HelpCenter";
import PartnerWithUs from "./pages/PartnerWithUs";
import LoginRegister from "./pages/LoginRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";

import AdminDashboard from "./admin/AdminDashboard";
import AddFood from "./admin/AddFood";
import ManageFood from "./admin/ManageFood";
import AllOrders from "./admin/AllOrders";
import ManageRestaurants from "./admin/ManageRestaurants";
import RestaurantDashboard from "./restaurant/RestaurantDashboard";
import DeliveryDashboard from "./delivery/DeliveryDashboard";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/partners" element={<PartnerWithUs />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* PROTECTED ROUTES (any logged in user) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track/:id" element={<OrderTracking />} />
        </Route>

        <Route element={<RoleRoute roles={["restaurant"]} />}>
          <Route path="/restaurant" element={<RestaurantDashboard />} />
        </Route>

        <Route element={<RoleRoute roles={["delivery_partner"]} />}>
          <Route path="/delivery" element={<DeliveryDashboard />} />
        </Route>

        {/* ADMIN ROUTES (admin only) */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-food" element={<AddFood />} />
          <Route path="/admin/manage-food" element={<ManageFood />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/admin/restaurants" element={<ManageRestaurants />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default App;
