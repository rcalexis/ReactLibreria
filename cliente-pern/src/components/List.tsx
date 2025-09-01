import React from "react";
import type { Libro } from "../types/types";
import Item from "./Item";

interface ListProps {
  books: Libro[];
  onDelete: (id: number) => void;
  onToggleAvailability: (id: number) => void;
}

const List: React.FC<ListProps> = ({ books, onDelete, onToggleAvailability }) => {
  if (books.length === 0) return <p>No hay libros disponibles.</p>;

  return (
    <div className="space-y-2">
      {books.map((book) => (
        <Item
          key={book.id}
          book={book}
          onDelete={onDelete}
          onToggleAvailability={onToggleAvailability}
        />
      ))}
    </div>
  );
};

export default List;
