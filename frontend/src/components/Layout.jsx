import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PageEffects, PageTransition } from "./PageEffects";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <PageEffects />
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <PageTransition><Outlet /></PageTransition>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
