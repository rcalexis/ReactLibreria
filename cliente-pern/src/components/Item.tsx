import React from "react";
import { useNavigate } from "react-router-dom";
import type { Libro } from "../types/types";

interface ItemProps {
  book: Libro;
  onDelete: (id: number) => void;
  onToggleAvailability: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ book, onDelete, onToggleAvailability }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/libros/${book.id}`)}
      className="bg-white shadow-2xl hover:shadow-3xl transition rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 cursor-pointer"
    >
      <div className="mb-4 sm:mb-0">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-2">{book.titulo}</h3>
        <p className="text-lg text-gray-600"><span className="font-semibold">Autor:</span> {book.autor}</p>
        <p className="text-lg text-gray-600"><span className="font-semibold">Genero:</span> {book.genero}</p>
        <p className="text-lg text-gray-600"><span className="font-semibold">Precio:</span> ${Number(book.precio).toFixed(2)}</p>
        <p className="text-lg text-gray-600"><span className="font-semibold">Paginas:</span> {book.paginas}</p>
        <p className={`mt-2 text-lg font-bold ${book.disponible ? "text-green-600" : "text-red-600"}`}>
          {book.disponible ? "✅ Disponible" : "❌ No disponible"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleAvailability(book.id!);
          }}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-lg transition ${
            book.disponible ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {book.disponible ? "Marcar No Disponible" : "Marcar Disponible"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/libros/editar/${book.id}`);
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition"
        >
          Editar
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(book.id!);
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Item;
