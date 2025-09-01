import React from "react";
import { useBooks } from "../hooks/useLibros";
import List from "../components/List";

const Libros: React.FC = () => {
  const { books, loading, error, deleteBook, updateAvailability } = useBooks();

  if (loading)
    return <p className="text-gray-600 animate-pulse text-center mt-10 text-xl">Cargando libros...</p>;
  if (error)
    return <p className="text-red-600 font-bold text-center mt-10 text-xl">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Lista de Libros</h2>
      <div className="space-y-6">
        <List books={books} onDelete={deleteBook} onToggleAvailability={updateAvailability} />
      </div>
    </div>
  );
};

export default Libros;
