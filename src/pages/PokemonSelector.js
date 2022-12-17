import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const PokemonSelector = () => {
  const [pokemonId,setPokemonId] = useState(1)
  const [pokemonData,setPokemonData] = useState([])
  const [error,setError] = useState(new Error());
  const [isLoaded,setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemonData(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      )

      
  },[pokemonId])

  function addId(){
    setPokemonId(pokemonId+1)
  }
  function decreaseId(){
    setPokemonId(pokemonId-1)
  }

  function goBattle(){
    
    navigate("/battle", { state: pokemonData });
  }

    return (
      <div className="pokemonSelectorContainer">
        <h1>Pokemon Selector</h1>
        <div className="pokemonSelector">
              <button onClick={decreaseId}>{'<'}</button>
            {
              pokemonData.stats &&

                <div>
                  <h1>{pokemonData.name}</h1>
                  <img src={pokemonData.sprites.front_default}/>
                    <div>
                      <ul>
                          <li> HP: {pokemonData.stats[0].base_stat} </li>
                          <li> Attack: {pokemonData.stats[1].base_stat} </li>
                          <li> Defense: {pokemonData.stats[2].base_stat} </li>
                          <li> special-attack: {pokemonData.stats[3].base_stat} </li>
                          <li> special-defense: {pokemonData.stats[4].base_stat} </li>
                          <li> Speed: {pokemonData.stats[5].base_stat} </li>
                      </ul>
                    </div>
                </div>
            }
          
            <button  onClick={addId}>{'>'}</button>
        </div>
            <button onClick={goBattle}>Battle</button>
        
      </div>
    )
}

export default PokemonSelector