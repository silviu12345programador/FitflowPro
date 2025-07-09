import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  availableTags?: string[];
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder,
  availableTags = [],
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = availableTags
        .filter(tag => tag.toLowerCase().includes(inputValue.toLowerCase()))
        .filter(tag => !tags.includes(tag)); // Exclude already selected tags
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, availableTags, tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputValue('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-2 border border-border bg-backgroundSecondary rounded-md focus-within:ring-2 focus-within:ring-primary">
        {tags.map(tag => (
          <span key={tag} className="bg-primary/30 text-primaryLight text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
            {tag}
            <button
              type="button"
              className="text-primaryLight hover:text-white focus:outline-none"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder || 'Añadir etiqueta...'}
          className="flex-grow bg-transparent focus:outline-none text-text p-1"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map(suggestion => (
            <li
              key={suggestion}
              onClick={() => addTag(suggestion)}
              className="px-4 py-2 cursor-pointer text-textSecondary hover:bg-primary hover:text-white"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

