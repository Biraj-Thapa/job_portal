import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12 p-6 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
