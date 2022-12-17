import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import getRandomNum from '../Utils/RandomNum';

const Battle = (props) => {
  const { state } = useLocation();
  const [pokemon,setPokemon] = useState(state)
  const [pokemonAgainst, setPokemonAgainst] = useState({})
  const [pokemonAttack,setPokemonAttack] = useState(pokemon.stats[1].base_stat)
  const [pokemonDefense,setPokemonDefense] = useState(pokemon.stats[2].base_stat)
  const [pokemonHp,setPokemonHp] = useState(pokemon.stats[0].base_stat)
  const [pokemonAgainstAttack,setPokemonAgainstAttack] = useState(0)
  const [pokemonAgainstDefense,setPokemonAgainstDefense] = useState(0)
  const [pokemonAgainstHp,setPokemonAgainstHp] = useState(pokemon.stats[0].base_stat)
  const navigate = useNavigate();
  const pokeImgEl = useRef(null);
  const pokeAgainstImgEl = useRef(null);


  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomNum(1,910)}`)
    .then(res => res.json())
    .then(
      (result) => {
        setPokemonAgainst(result);

        setPokemonAgainstHp(result.stats[0].base_stat)
        setPokemonAgainstDefense(result.stats[2].base_stat)
        setPokemonAgainstAttack(result.stats[1].base_stat)
      }
    )
  },[])




  


useEffect(()=>{
    if(pokemonAgainstHp<=0){
        alert("THE WINNER IS " + pokemon.name)
        setPokemonAgainstHp(0)
        navigate("/winner",{state:pokemon})

    }

    if(pokemonHp<=0){
      alert("THE WINNER IS " + pokemonAgainst.name)
      setPokemonHp(0)
      navigate("/loser",{state:pokemon})
  }
},[pokemonAgainstHp,pokemonHp])


 function doDamage(attacker,defender){
      // defender.stats[0].base_stat = attacker.stats[1].base_stat - defender.stats[2].base_stat // hp = attacker attack - defender defense
      const hpResult = pokemonAgainstHp - (pokemonAttack-pokemonAgainstDefense)
      setPokemonAgainstHp(hpResult)
      pokeImgEl.current.className="attacking"
      pokeAgainstImgEl.current.className="defending"

      setTimeout(()=>{
        pokeAgainstImgEl.current.className=""
        pokeImgEl.current.className=""
      },500)

  }


  function takeDamage(attacker,defender){
    // defender.stats[0].base_stat = attacker.stats[1].base_stat - defender.stats[2].base_stat // hp = attacker attack - defender defense
    
    const hpResult = pokemonHp - (pokemonAgainstAttack-pokemonDefense)
    setPokemonHp(hpResult)
    pokeAgainstImgEl.current.className="attacking"
    pokeImgEl.current.className="defending"

    setTimeout(()=>{

      pokeAgainstImgEl.current.className=""
      pokeImgEl.current.className=""
    },500)
}

    return (
      <div>
        {
          pokemonAgainst.stats && 


          <div className="battleContainer">
              <div className='pokemonAgainstContainer'>
                <div className='pokemon-stats'>
                  <h3>hp: {pokemonAgainstHp}</h3>
                  <h2>{pokemonAgainst.name}</h2>
                </div>

                  <img ref={pokeAgainstImgEl} src={pokemonAgainst.sprites.front_default}/>
                  <ul>
                          <li> Attack: {pokemonAgainstAttack} </li>
                          <li> Defense: {pokemonAgainstDefense} </li>
                  </ul>
                  <div>
                    <button onClick={()=>takeDamage(pokemonAgainst,pokemon)}>Atacar</button>
                  </div>

              </div>

              <div className='pokemonContainer'>
                <div className='pokemon-stats'>
                  <h3>hp: {pokemonHp}</h3>
                  <h2>{pokemon.name}</h2>
                </div>
                 
                 <img ref={pokeImgEl} src={pokemon.sprites.back_default}/>
                      <ul>
                          <li> Attack: {pokemonAttack} </li>
                          <li> Defense: {pokemonDefense} </li>
                      </ul>
                </div>
                <div>
                    <button onClick={()=>doDamage(pokemon,pokemonAgainst)}>Atacar</button>
                  </div>

          </div>

        }

      </div>
    )
}

export default Battle