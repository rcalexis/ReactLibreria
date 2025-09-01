import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";

import NuevoLibro from "./views/NuevoLibro";
import Libros from "./views/Libros";
import EditarLibro from "./views/EditarLibro";
import DetailLibro from "./views/DetailLibro";

export const router = createBrowserRouter([
     {
    path: "/",
    element: <Layout />,
    children: [
      { path: "registro/nuevo", element: <NuevoLibro /> },
      { path: "libros", element: <Libros /> },
      { path: "libros/:id", element: <DetailLibro /> },
      { path: "libros/editar/:id", element: <EditarLibro /> },
    ],
  },
])