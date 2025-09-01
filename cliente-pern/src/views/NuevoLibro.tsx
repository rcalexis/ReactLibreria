import React, { useState } from "react";
import Form from "../components/Form";
import { useBooks } from "../hooks/useLibros";
import type { Libro } from "../types/types";
import { useNavigate } from "react-router-dom";

const NuevoLibro: React.FC = () => {
  
  const { createBook } = useBooks();
  const [mensaje, setMensaje] = useState<string | null>(null);
const navigate = useNavigate();

  const handleSubmit = async (book: Libro) => {
    const result = await createBook(book);

    if (!result.success) {
      setMensaje(result.message || "Error desconocido");
    } else {
      setMensaje("Libro creado exitosamente");
      navigate("/libros");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Libro</h2>
      {mensaje && (
        <p
          className={`mb-4 p-2 rounded ${
            mensaje.includes("existe")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {mensaje}
        </p>
      )}
      <Form onSubmit={handleSubmit} submitText="Crear Libro" />
    </div>
  );
};

export default NuevoLibro;
