import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import getRandomNum from '../Utils/RandomNum';
import { useNavigate } from "react-router-dom";

const Loser = () => {
    const navigate = useNavigate()
    return (
      <div>
        <h1>VOCÊ PERDEU!</h1>
        <button onClick={ ()=>navigate("/select-pokemon")}>TENTE NOVAMENTE</button>
      </div>
    )
}

export default Loser