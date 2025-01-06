import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./pages/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FreeResourcesPage from "./pages/FreeResourcesPage";
import CoursesPage from "./pages/CoursesPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardLayout from "./pages/layouts/AdminDashboardLayout";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminAuth, {
  AdminRootAuth,
  isValidToken,
} from "./components/admin/AdminAuth";
import ManageAdminsPage from "./pages/admin/ManageAdminsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/free-resources' element={<FreeResourcesPage />} />
        <Route path='/courses' element={<CoursesPage />} />
      </Route>

      <Route
        path='/admin'
        element={<AdminAuth element={<Navigate to='/admin/dashboard' />} />}
      />
      <Route
        path='/admin/login'
        element={
          isValidToken() ? (
            <Navigate to='/admin/dashboard' />
          ) : (
            <AdminLoginPage />
          )
        }
      />

      <Route
        path='/admin/dashboard/'
        element={<AdminAuth element={<AdminDashboardLayout />} />}>
        <Route index element={<AdminAuth element={<AdminHomePage />} />} />
        <Route
          path='contacts'
          element={<AdminAuth element={<AdminContactsPage />} />}
        />
        <Route
          path='admins'
          element={
            <AdminAuth
              element={<AdminRootAuth element={<ManageAdminsPage />} />}
            />
          }
        />
        <Route
          path='settings'
          element={<AdminAuth element={<AdminSettingsPage />} />}
        />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
