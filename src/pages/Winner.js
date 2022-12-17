import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import getRandomNum from '../Utils/RandomNum';
import { useNavigate } from "react-router-dom";

const Winner = (props) => {
    const { state } = useLocation();
  console.log(state);
const navigate = useNavigate();
    return (
      <div>
        
        {
              state.stats &&

                <div>
                    <h2>PARABÉNS! VOCÊ VENCEU!!!</h2>
                  <h1>{state.name}</h1>
                  <img src={state.sprites.front_default}/>
                    <div>
                      <ul>
                          <li> HP: {state.stats[0].base_stat} </li>
                          <li> Attack: {state.stats[1].base_stat} </li>
                          <li> Defense: {state.stats[2].base_stat} </li>
                          <li> special-attack: {state.stats[3].base_stat} </li>
                          <li> special-defense: {state.stats[4].base_stat} </li>
                          <li> Speed: {state.stats[5].base_stat} </li>
                      </ul>
                    </div>
                </div>
            }

        <button onClick={ ()=>navigate("/select-pokemon")}>NOVO JOGO</button>
      </div>
    )
}

export default Winner