import React from "react";

interface Props {
  label:string
  opcoes: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = (props: Props) => {
  return (
    <div className="flex flex-col gap-[3px]">
      <label htmlFor="meuSelect">{props.label}</label>
      <select id="meuSelect" value={props.value} onChange={props.onChange}>
        <option value="">--Selecione--</option>
        {props.opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
