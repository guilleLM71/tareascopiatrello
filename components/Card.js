import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEdit, AiTwotoneMessage} from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Modal from "./Modal";
function Card({texto, id, setDragged,rendertareas}) {
  const [card, setCard]=useState({texto:"",lista:""})
    function ondragstart(event){
      console.log(event.target.closest('[data-list]').dataset.list)
        setDragged({
          data:{id,texto},
          list: event.target.closest('[data-list]').dataset.list 
        })

    }
    const [showEdit, setShowEdit]=useState(false)
    const updatetareatexto = async (id) => {

      try {
       
          await axios.put("/api/tareas/"+id, {
            texto:card.texto
          }) 
          .then((res) => {
            console.log('update aqui :>> ',res.data);
                    
          })
         
      } catch (error) {
        console.log('error :>> ', error);
      }
    };
    const editarcardmodal=(event)=>{
      setShowEdit(true)
      setCard(card.texto)
      let clon = {...card}
      clon.lista=event.target.closest('[data-list]').dataset.list
      clon.texto=texto
      setCard(clon)
      console.log('object :>> ', card);
    }


    
    function editartarjeta(event){

      updatetareatexto(id)

      rendertareas()

     
      
    }
    const handleChange = ( {  target: { name, value } }) => 
    { 
            setCard({ ...card, [name]: value });
            
    }
    useEffect(()=>{  console.log(card)},[card])

  return (
    <div draggable onDragStart={ondragstart} className="gap-3 flex flex-col bg-white rounded-md shadow-md overflow-hidden p-3 mb-2">
      <div className="flex flex-row  justify-between">
        <p className="text-slate-900">{texto}</p>
        <div >
        <AiFillEdit className="cursor-pointer hover:w-6 hover:h-6"
        onClick={editarcardmodal}
        ></AiFillEdit>
         </div>

     </div> 
     <div className="flex flex-row  justify-between">
      <div className="">
      <FaUserAlt></FaUserAlt>
      </div>
     
      <div>
        <AiTwotoneMessage></AiTwotoneMessage>
      </div> 
    </div>

    <Modal
           show={showEdit}
           setShow={setShowEdit}
           >
            <div className='flex flex-col justify-around items-center'>
            <h3 className='text-slate-800 font-bold my-6'>Agregar tarjeta</h3>
     
            <input value={card.texto}   
            name="texto" 
            onChange={handleChange}
            className="w-auto mb-6 shadow-md rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-10" placeholder='Titulo'></input>
          
            <button onClick={editartarjeta} className=' py-3 my-6 text-slate-50 font-sans bg-blue-600 hover:bg-blue-700 shadow-md rounded-lg w-48 h-18 transform motion-safe:hover:scale-110'
            >
              Editar
            </button>
            </div>
            </Modal>

    </div>
  );
}

export default Card;
