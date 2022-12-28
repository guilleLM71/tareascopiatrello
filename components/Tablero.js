import React, { useEffect, useState } from 'react';
import Lista from "./Lista"
import Card from "./Card"
import Modal from './Modal';
import { AiFillFire } from 'react-icons/ai';
import { useRouter } from 'next/router';
import axios from 'axios';
const tareaslist = [
   
]
  
const progresolist = [
  
  ]
  
  
const terminadolist = [
    
  ]

function Tablero(props) {
    
  const [listOfLists, setListOfLists] = useState(
    { tareaslist,
      progresolist,
      terminadolist,
    }
    )
  
    const [dragged, setDragged]=useState(null)
    const [card, setCard]=useState({texto:"",lista:""})


  



    useEffect(()=>{ 
       console.log(card)
       rendertareas()
      },[card]
      
    )
    const router = useRouter();

    const rendertareas = async () => {   
      
      try {
          if (router.query) {
            await axios.get("/api/tareas")
            .then((res) => {
              //console.log(res.data);
              const clon={...listOfLists}

              const tareas=res.data.filter(item=>item.lista=="tareaslist")
              clon["tareaslist"]=tareas;
              setListOfLists(clon)   

              const progresos=res.data.filter(item=>item.lista=="progresolist")
              clon["progresolist"]=progresos;
              setListOfLists(clon) 

              const terminados=res.data.filter(item=>item.lista=="terminadolist")
              clon["terminadolist"]=terminados;
              setListOfLists(clon)  


              
            })
          
          }
    
          //router.push("/api/tareas");
        } catch (error) {
          console.log('error :>> ', error);
         
        }
      };

 

    const gettarea = async (id) => {

        try {
         
            await axios.get("/api/tareas/"+id) 
            .then((res) => {
              console.log('aqui :>> ',res.data);
                      
            })
           
        } catch (error) {
          console.log('error :>> ', error);
        }
      };


      const deletetarea = async (id) => {

        try {
         
            await axios.delete("/api/tareas/"+id) 
            .then((res) => {
              console.log('aqui :>> ',res.data);
                      
            })
           
        } catch (error) {
          console.log('error :>> ', error);
        }
      };


      const updatetarealista = async (id,target) => {

        try {
         
            await axios.put("/api/tareas/"+id, {
              lista:target
            }) 
            .then((res) => {
              console.log('update aqui :>> ',res.data);
                      
            })
           
        } catch (error) {
          console.log('error :>> ', error);
        }
      };

    function handleonDrop(event){
      event.preventDefault()
      const listtarget=event.currentTarget.dataset.list
      console.log(listtarget)
      const clon={...listOfLists}
      //const clon2=structuredClone(listoflist) 
      const tarea=clon[dragged.list].filter(item=>item.id==dragged.data.id)
      console.log('tarea:>> ',tarea)
      gettarea(tarea[0].id)
      updatetarealista(tarea[0].id,listtarget)

      
      const newlist=clon[dragged.list].filter(item=>item.id!==dragged.data.id)
      console.log(newlist)
      console.log(dragged.list)
      console.log(clon[dragged.list])
      clon[dragged.list]= newlist;
      console.log(clon[dragged.list])



      clon[listtarget].push(dragged.data)
      console.log(clon)
      setListOfLists(clon)    
      console.log(listOfLists)
  
      
  }
 
 
   

  
    
 

    return (
        <div className='bg-green-400 flex flex-row' >

      
      <Lista  
      id={"tareaslist"}
      handleonDrop={handleonDrop} 
      nombre={"Tareas"} 
      rendertareas={rendertareas}  
      >
          {listOfLists.tareaslist.map((item, index)=>(
            <Card      
            rendertareas={rendertareas}  
            setDragged={setDragged} 
            {...item} 
            key={item.id}>

            </Card>
          ))
          }

      </Lista>

      <Lista  id={"progresolist"} 
      handleonDrop={handleonDrop}  
      nombre={"En progreso"}
      rendertareas={rendertareas}  
    >
          {listOfLists.progresolist.map((item, index)=>(
            <Card rendertareas={rendertareas}   setDragged={setDragged}  {...item} key={item.id}
                 
            >

            </Card>
          ))
          }

      </Lista>

      <Lista   id={"terminadolist"} 
      handleonDrop={handleonDrop} 
       nombre={"Realizado"}
       rendertareas={rendertareas}  


       >
          {listOfLists.terminadolist.map((item, index)=>(
            <Card  rendertareas={rendertareas}   setDragged={setDragged}  {...item} key={item.id}>

            </Card>
          ))
          }

      </Lista>


    
          


     
      </div>

    );
}

export default Tablero;