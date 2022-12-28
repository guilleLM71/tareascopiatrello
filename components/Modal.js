import React, { useEffect, useState , useRef} from "react";
import ReactDOM from "react-dom";
import { AiFillFire } from "react-icons/ai";
import styled from "styled-components";

const Modal = ({show, setShow, children}) => {
  
  return (
    <div className="flex flex-col justify-center items-center m-auto ">
     
      {show ? (
       <StyledModalOverlay>
          <StyledModal>
        
          <StyledModalHeader>
          <button
            className="w-9  h-9 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
            onClick={() => setShow(false)}
          >
            x
          </button>
          </StyledModalHeader>
          <StyledModalBody>
            {children}
        
          </StyledModalBody>
          </StyledModal>
        </StyledModalOverlay>
      ) : null}

     
    </div>
  );
};

const StyledModalBody = styled.div`
  padding-top: 10px;
  height:auto;
  widht:auto;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

// the wrapper component
const StyledModalWrapper = styled.div`
  width: 500px;
  height: 600px;
  `;

const StyledModal = styled.div`
  background: white;
  height:40%;
  width:20%;
  border-radius: 15px;
  padding: 15px;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  
`;

export default Modal
  
