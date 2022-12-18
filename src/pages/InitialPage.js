import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import getRandomNum from '../Utils/RandomNum';
import { useNavigate } from "react-router-dom";

const InitialPage = () => {
  
const navigate = useNavigate();
    return (
      <div className='initialPage'>
         <div className="pokemon-logo">
        </div>
        <button onClick={ ()=>navigate("select-pokemon")}>INICIAR NOVO JOGO</button>
      </div>
    )
}

export default InitialPage