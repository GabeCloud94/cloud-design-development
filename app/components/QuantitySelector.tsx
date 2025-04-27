import {useState, useEffect} from 'react';

export function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden max-w-min">
      <button
        onClick={handleDecrement}
        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
      >
        -
      </button>
      <span className="px-4 py-2 bg-white text-center w-12">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
      >
        +
      </button>
    </div>
  );
}