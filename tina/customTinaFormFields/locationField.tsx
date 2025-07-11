import React, { useState } from 'react';

export const countryCoordinates = [
  { location: 'Copenhagen, Denmark', lat: 0, lng: 0 },
  { location: 'Porto, Portugal', lat: 0, lng: 0 },
  { location: 'London, England', lat: 7, lng: 52 },
  { location: 'Melbourne, Australia', lat: -27.81015, lng: 220.9541 },
  { location: 'Newcastle, Australia', lat: -27.81015, lng: 210 },
  { location: 'Oslo Spektrum', lat: 59, lng: 10 },
  { location: 'Oslo, Norway', lat: -1, lng: 59 },
];

export const LocationField = ({
  input,
  field,
  form,
}: {
  input: any;
  field: any;
  form: any;
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(input.value || '');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filteredSuggestions = countryCoordinates.filter((coord) =>
        coord.location.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (location) => {
    setInputValue(location);
    setShowSuggestions(false);
    input.onChange(location);

    const coordinates = countryCoordinates.find(
      (coord) => coord.location.toLowerCase() === location.toLowerCase(),
    );

    if (coordinates) {
      const fullPath = input.name;
      const basePath = fullPath.replace(/\.location$/, '');
      form.change(`${basePath}.markerLAT`, coordinates.lat);
      form.change(`${basePath}.markerLONG`, coordinates.lng);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="mb-4 relative z-[999]">
      <label className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2">
        {field.label}
      </label>
      <input
        type="text"
        className="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Enter location"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => handleSuggestionClick(suggestion.location)}
            >
              {suggestion.location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
