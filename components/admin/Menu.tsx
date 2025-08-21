"use client";

import { useState } from "react";
import Image from "next/image";

interface MenuProps {
  label: string;
  initialValue: string;
  items: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export default function Menu({ label, initialValue, items, onChange }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {items.find(item => item.value === selectedValue)?.label || label}
        <Image
          src="/icons/chevron-down.svg"
          width={16}
          height={16}
          className="ml-2"
          alt="dropdown"
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item) => (
              <button
                key={item.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
                onClick={() => handleSelect(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
