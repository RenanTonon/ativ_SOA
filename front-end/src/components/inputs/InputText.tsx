import React from "react";

interface Props {
  nameLabel: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ nameLabel, placeholder, value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-[3px]">
      <label htmlFor={nameLabel}>{nameLabel}</label>
      <input
        type="text"
        id={nameLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2"
      />
    </div>
  );
};

export default InputText;
