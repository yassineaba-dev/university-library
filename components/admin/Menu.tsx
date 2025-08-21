"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MenuItem {
  value: string;
  label: string;
  bgColor?: string;
  textColor?: string;
}

interface MenuProps {
  label: string;
  initialValue: string;
  items: MenuItem[];
  onChange?: (value: string) => void;
  showLabel?: boolean;
  variant?: "default" | "badge";
}

export default function Menu({ 
  label, 
  initialValue, 
  items, 
  onChange, 
  showLabel = true,
  variant = "default" 
}: MenuProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const selectedItem = items.find(item => item.value === selectedValue) || items[0];

  const getItemStyle = (item: MenuItem) => {
    if (variant === "badge" && item.bgColor && item.textColor) {
      return cn(
        "capitalize w-fit text-center text-sm font-medium px-3 py-1 rounded-full",
        item.bgColor,
        item.textColor
      );
    }
    
    return "text-sm";
  };

  const triggerContent = variant === "badge" ? (
    <span className={getItemStyle(selectedItem)}>
      {selectedItem.label}
    </span>
  ) : (
    <div className="flex items-center justify-between gap-2 min-w-[120px]">
      <span>{selectedItem.label}</span>
      <Image
        src="/icons/chevron-down.svg"
        width={16}
        height={16}
        alt="dropdown"
      />
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          variant === "default" && 
          "inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none",
          "outline-none ring-0 focus:ring-0"
        )}
      >
        {triggerContent}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {showLabel && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleSelect(item.value)}
            className="cursor-pointer"
          >
            <span className={getItemStyle(item)}>
              {item.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
