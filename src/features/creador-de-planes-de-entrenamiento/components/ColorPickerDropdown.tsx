import React, { useState } from 'react';
import { VscPaintcan } from 'react-icons/vsc';

const colors = [
  { name: 'None', value: 'transparent' },
  { name: 'Blue', value: '#3B82F6' }, // primary
  { name: 'Green', value: '#10B981' }, // secondary
  { name: 'Amber', value: '#F59E0B' }, // accent
  { name: 'Red', value: '#EF4444' }, // error
  { name: 'Indigo', value: '#8B5CF6' }, // focus
  { name: 'Info', value: '#3B82F6' },
];

interface ColorPickerDropdownProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPickerDropdown: React.FC<ColorPickerDropdownProps> = ({ selectedColor, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (colorValue: string) => {
    onColorChange(colorValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-surface"
        aria-label="Change day color"
      >
        <VscPaintcan style={{ color: selectedColor !== 'transparent' ? selectedColor : 'currentColor' }} />
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-40 bg-card rounded-md shadow-lg">
          <div className="py-1">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color.value)}
                className="w-full text-left px-4 py-2 text-sm text-textSecondary hover:bg-surface flex items-center"
              >
                <span
                  className="block w-4 h-4 rounded-full mr-3 border border-border"
                  style={{ backgroundColor: color.value }}
                ></span>
                {color.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPickerDropdown;