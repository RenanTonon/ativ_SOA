import { useNavigate } from "react-router-dom";


interface Props {
    conteudo:string
    path: string
}


const NavigateButton = (props:Props) => {
  const navigate = useNavigate();
  
    const setNavigate = () => {
        navigate(props.path);
    };
  
  return (
    <button onClick={setNavigate} className=" flex bg-blue-600 p-2 rounded-[10px] text-white w-[200px] h-[40px]  items-center justify-center content-center hover:bg-black hover:text-white duration-300 font-mono">{props.conteudo}</button>
  )

}

export default NavigateButton;