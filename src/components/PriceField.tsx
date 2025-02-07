import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

interface PriceFieldProps {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string,
  className?: string;
  [key: string]: any; // To accept additional props
}
const PriceField: React.FC<PriceFieldProps> = ({ value, onChange, className, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    newValue = arabicToEnglishNumbers(newValue);
    event.target.value = newValue;
    if (newValue == "."){
      event.target.value  =  newValue = "0.";
    }
    if (newValue === '' || /^[0-9]+(\.[0-9]*)?$/.test(newValue)) {
      onChange(event);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  
  return (
      <Form.Control
      type="text"
      value={value}
      onFocus={handleFocus}
      onChange={handleChange}
      ref={inputRef}
      className={`w-100 ${className}`}
      placeholder={props.placeholder}
      {...props}
    />
  );
};



export function arabicToEnglishNumbers(input: string) {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  return input.split('').map(char => {
      const index = arabicNumbers.indexOf(char);
      return index !== -1 ? englishNumbers[index] : char;
  }).join('');
};

export default PriceField;