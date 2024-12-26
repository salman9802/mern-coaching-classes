import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./pages/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FreeResourcesPage from "./pages/FreeResourcesPage";
import CoursesPage from "./pages/CoursesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/free-resources' element={<FreeResourcesPage />} />
      <Route path='/courses' element={<CoursesPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
