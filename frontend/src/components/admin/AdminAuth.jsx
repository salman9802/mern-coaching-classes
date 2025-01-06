import React from "react";
import { Navigate } from "react-router-dom";

const TOKEN_NAME = "adjwtok";

const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

const parseToken = () => {
  return JSON.parse(atob(getToken().split(".")[1]));
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

const isValidToken = () => {
  if (getToken() == null) return false;

  const token = localStorage.getItem(TOKEN_NAME);
  const payload = token.split(".")[1];

  // Decode base 64 and parse resultant string into object
  const { exp } = JSON.parse(atob(payload));

  // Date.now() returns ms from epoch. exp is secs from epoch
  return exp > Math.floor(Date.now() / 1000);
};

const deleteToken = () => {
  localStorage.removeItem(TOKEN_NAME);
};

const isRoot = () => {
  if (!isValidToken()) return false;

  const { type } = parseToken();
  return type === "root";
};

// Function to protect admin routes
const AdminAuth = ({ element }) => {
  return isValidToken() ? element : <Navigate to='/admin/login' />;
};

// Function to protect root admin routes
const AdminRootAuth = ({ element }) => {
  return isRoot() ? element : <Navigate to='/admin' />;
};

export {
  AdminAuth as default,
  AdminRootAuth,
  getToken,
  isValidToken,
  setToken,
  parseToken,
  deleteToken,
};
