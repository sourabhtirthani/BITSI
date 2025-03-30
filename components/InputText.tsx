import { InputTextProps } from "@/types";

  // focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
  const InputText = ({ id, className = '', type = 'text', name , placeHolder, step}: InputTextProps) => {
    return (
      <input
        id={id}
        className={` block w-full  rounded  ${className}`}
        type={type}
        name={name}
        placeholder={placeHolder}
        {...((id === 'royalties' || id === 'price') ? { step: step } : {})}
      />
    );
  }
  
  export default InputText;