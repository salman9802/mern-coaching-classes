import React from "react";
import { Navigate } from "react-router-dom";

const isValidToken = () => {
  if (localStorage.getItem("adjwtok") == null) return false;

  const token = localStorage.getItem("adjwtok");
  const payload = token.split(".")[1];

  // Decode base 64 and parse resultant string into object
  const { exp } = JSON.parse(atob(payload));

  // Date.now() returns ms from epoch. exp is secs from epoch
  return exp > Math.floor(Date.now() / 1000);
};

// Function to protect admin routes
const AdminAuth = ({ element }) => {
  return isValidToken() ? element : <Navigate to='/admin/login' />;
};

export default AdminAuth;
