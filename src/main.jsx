import ReactDOM from "react-dom/client";

import { EditProvider } from "./ContextAdmin/EditContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../src/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Contacto from "../src/Pages/Contacto";

import PaginaError from "../src/Pages/PaginaError";
import Layout from "../src/Components/Layout";
import Home from "../src/Pages/Home";
import ResetPassword from "../src/Pages/ResetPassword";
import ForgotPassword from "../src/Pages/ForgotPassword";
import { AuthProvider } from "./Context/AuthContext";
import PaginaLoguin from "./Pages/PaginaLoguin";
import PaginaRegistro from "./Pages/PaginaRegistro";
import { ProtectedRoute } from "../src/Components/ProtectedRoute";
import { FavoritesProvider } from "./Context/FavContext";
import PageProductCard from "./Pages/PageProductCard";
import { ProductsProvider } from "./Context/ProductsContext";
import { Carrito } from "./Pages/Carrito";
import { ShoppingProvider } from "./Context/ShoppingContext";
import PageAdmin from "./Pages/PageAdmin.jsx";
import Ayuda from "./Pages/Ayuda.jsx";
import SuccesPassword from "./Pages/SuccesPassword.jsx";

import Favorites from "./Pages/Favorites.jsx";
import Categories from "./Components/Categories.jsx";
import { AdminProvider } from "./Context/AdminContext.jsx";

const router = createBrowserRouter([
  {
    index: "/",
    element: (
      <div>
        <Layout />
      </div>
    ),
    errorElement: <PaginaError />,

    children: [
      {
        index: true,
        element: (
          <div>
            <Home />
          </div>
        ),
      },

      {
        path: "/contacto",
        element: (
          <div>
            <Contacto />
          </div>
        ),
      },
      {
        path: "/sendEmail",
        element: (
          <div>
            <ResetPassword />
          </div>
        ),
      },

      {
        path: "/favorit/*",
        element: (
          <div>
            <Favorites />
          </div>
        ),
      },
      // {
      {
        path: "/help",
        element: (
          <div>
            <Ayuda />
          </div>
        ),
      },
      {
        path: "/succesPassword",
        element: (
          <div>
            <SuccesPassword />
          </div>
        ),
      },
      {
        path: "/productCard/:id",
        element: (
          <div>
            <PageProductCard />
          </div>
        ),
      },
      {
        path: "/forgotPassword/:id/:token",
        element: (
          <div>
            <ForgotPassword />
          </div>
        ),
      },
      {
        path: "/productos/hombres",
        element: (
          <div>
            <Categories category="Hombres" />
          </div>
        ),
      },
      {
        path: "/productos/mujeres",
        element: (
          <div>
            <Categories category="Mujeres" />
          </div>
        ),
      },
      {
        path: "/productos/niños",
        element: (
          <div>
            <Categories category="Niños" />
          </div>
        ),
      },
      {
        path: "/registro",
        element: (
          <div>
            <PaginaRegistro />
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <div>
            <PaginaLoguin />
          </div>
        ),
      },
      {
        path: "/carrito",
        element: (
          <div>
            <Carrito />
          </div>
        ),
      },
      {
        path: "/create-order",
        element: (
          <div>
            <h1>pagando carrito</h1>
          </div>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <PageAdmin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
      <ProductsProvider>
        <ShoppingProvider>
          <EditProvider>
            <FavoritesProvider>
              <RouterProvider router={router} />
            </FavoritesProvider>
          </EditProvider>
        </ShoppingProvider>
      </ProductsProvider>
    </AdminProvider>
  </AuthProvider>
);
