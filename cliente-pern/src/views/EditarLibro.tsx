import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useBooks } from "../hooks/useLibros";
import type { Libro } from "../types/types";

const EditarLibro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, updateBook } = useBooks();
  const [initialData, setInitialData] = useState<Libro | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBookById(Number(id)).then((book) => {
        if (book) setInitialData(book);
      });
    }
  }, [id]);

  const handleSubmit = async (book: Libro) => {
    if (!id) return;
    await updateBook(Number(id), book);
    navigate("/libros");
  };

  if (!initialData) return <p>Cargando libro...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Editar Libro</h2>
      <Form initialData={initialData} onSubmit={handleSubmit} submitText="Actualizar Libro" />
    </div>
  );
};

export default EditarLibro;
