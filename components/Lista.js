import { useRouter } from 'next/router';
import react, { useEffect, useState } from 'react';
import { GrAddCircle } from "react-icons/gr";
import Modal from './Modal';
import axios from "axios";
import toast from "react-hot-toast";
function Lista({children, nombre,handleonDrop,id,rendertareas }) {
    const [target,setTarget]=useState("")
    const [show, setShow] = useState(false)
    const [texto, setTexto]=useState("")
    const [card, setCard]=useState({texto:"",lista:""})
    function handleonDragOver(event){
        event.preventDefault()
       
        //console.log(event)
        
    }

    useEffect(()=>{
        console.log(card)
        
    },[target,card])
    function abrirmodal(event){
        event.preventDefault()
        setShow(!show)
        console.log(show)
        let clon = {...card}
        clon.lista=event.target.closest('[data-list]').dataset.list
        setCard(clon)
        console.log('object :>> ', card);

      }
    const handleChange = ( {  target: { name, value } }) => 
    { 
            setCard({ ...card, [name]: value });
            
    }

    const router = useRouter();
    

    const agregartarea = async (event) => {
      
    event.preventDefault();
    try {
        if (router.query) {
          await axios.post("/api/tareas", card);
          
 
          toast.success("Tarea", {
            position: "bottom-center",
          });
        }
  
        //router.push("/api/tareas");
      } catch (error) {
        toast.error(error.response.data.message);
       
      }
      rendertareas()
    };

    return (
        <div 
        data-list={id} 
        onDragOver={handleonDragOver} 
        onDrop={handleonDrop}
        className='flex flex-col justify-between bg-slate-400 rounded-xl shadow-md overflow-hidden container w-4/12 p-3 m-3 h-auto'>
            <div>
            <h2 className='text-slate-900 font-bold mb-2'>
                {nombre}
            </h2>
            {children}
            </div>
            <div onClick={abrirmodal } className='cursor-pointer bg-blue-100 rounded-lg w-8/12 mx-auto flex flex-row items-center justify-center'>
            <GrAddCircle></GrAddCircle> 
            <h4>Añadir otra tarjeta</h4>
             </div>
          
             <Modal
           show={show}
           setShow={setShow}
           >
            <div className='flex flex-col justify-around items-center'>
            <h3 className='text-slate-800 font-bold my-6'>Agregar tarjeta</h3>
     
            <input value={card.texto}   
            name="texto" 
            onChange={handleChange}
            className="w-auto mb-6 shadow-md rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-10" placeholder='Titulo'></input>
          
            <button onClick={(event)=>{agregartarea(event)}} className=' py-3 my-6 text-slate-50 font-sans bg-blue-600 hover:bg-blue-700 shadow-md rounded-lg w-48 h-18 transform motion-safe:hover:scale-110'
            >
              Agregar
            </button>
            </div>
            </Modal>
          
        </div>
    );
}

export default Lista;
