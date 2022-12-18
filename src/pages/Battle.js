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
  const [pokemonActualHp,setPokemonActualHp] = useState(100)
  const [pokemonActualAgainstHp,setPokemonActualAgainstHp] = useState(100)
  const [pokemonFirstHp, setPokemonFirstHp] = useState(pokemon.stats[0].base_stat)
  const [pokemonAgainstFirstHp, setPokemonAgainstFirstHp] = useState(100)
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
        // setPokemonActualAgainstHp(result.stats[0].base_stat)
        setPokemonAgainstFirstHp(result.stats[0].base_stat)
      }
    )
  },[])




  


useEffect(()=>{

    console.log(pokemonActualAgainstHp);
    console.log(pokemonActualHp);

    if(pokemonActualAgainstHp<=0){
        alert("THE WINNER IS " + pokemon.name)
        setPokemonAgainstHp(0)
        navigate("/winner",{state:pokemon})

    }

    if(pokemonActualHp<=0){
      alert("THE WINNER IS " + pokemonAgainst.name)
      setPokemonHp(0)
      navigate("/loser",{state:pokemon})
  }
},[pokemonActualHp,pokemonActualAgainstHp])


 function doDamage(attacker,defender){
      console.log("DO DAMAGE");
      let hpResult = pokemonAgainstHp - Math.abs(pokemonAttack-pokemonAgainstDefense)


      const math = (100 * hpResult) / pokemonAgainstFirstHp
      console.log(math);
      console.log(hpResult);
      setPokemonActualAgainstHp(math)
      setPokemonAgainstHp(hpResult)


      pokeImgEl.current.className="attacking"
      pokeAgainstImgEl.current.className="defending"

      setTimeout(()=>{
        pokeAgainstImgEl.current.className=""
        pokeImgEl.current.className=""
      },1100)

  }


  function takeDamage(attacker,defender){
    
    let hpResult = pokemonHp - Math.abs(pokemonAgainstAttack-pokemonDefense)
    
    // if(pokemonDefense<pokemonAgainstAttack){
    //   hpResult = pokemonActualHp - 5
    // }
    
    const math = (100 * hpResult) / pokemonFirstHp

      setPokemonActualHp(math)
      setPokemonHp(hpResult)
    pokeAgainstImgEl.current.className="attacking"
    pokeImgEl.current.className="defending"

    setTimeout(()=>{

      pokeAgainstImgEl.current.className=""
      pokeImgEl.current.className=""
    },1100)
}

    return (
      <div>
        {
          pokemonAgainst.stats && 


          <div className="battleContainer">
              <div className='pokemonAgainstContainer'>
                <div className='pokemon-stats'>
                <ul className='pokemon-mainStats'>
                          <li> Attack: {pokemonAgainstAttack} </li>
                          <li> Defense: {pokemonAgainstDefense} </li>
                          <li> Hp: {Math.floor(pokemonAgainstHp)} </li>
                  </ul>
                  <div className='attack-button'>
                    <button onClick={()=>takeDamage(pokemonAgainst,pokemon)}>Atacar</button>
                  </div>
                 
                </div>

                <div className='pokemon-state'>
                  <h2 className='pokemon-name'>{pokemonAgainst.name}</h2>
                  <div className='hpBar'>
                  <div  style={{"width":pokemonActualAgainstHp+"%"}} className='hpActual'>


                    </div>
                  </div>
                  </div> 
                  
                  <img ref={pokeAgainstImgEl} src={pokemonAgainst.sprites.front_default}/>
                 

              </div>

              <div className='pokemonContainer'>
              <img ref={pokeImgEl} src={pokemon.sprites.back_default}/>

              <div className='pokemon-stats'>
                <ul className='pokemon-mainStats'>
                          <li> Attack: {pokemonAttack} </li>
                          <li> Defense: {pokemonDefense} </li>
                          <li> Hp: {Math.floor(pokemonHp)} </li>

                  </ul>
                  <div className='attack-button'>
                    <button onClick={()=>doDamage(pokemonAgainst,pokemon)}>Atacar</button>
                  </div>
                 
                </div>

                <div className='pokemon-state'>
                  <h2 className='pokemon-name'>{pokemon.name}</h2>
                  <div className='hpBar'>
                    <div  style={{"width":pokemonActualHp+"%"}} className='hpActual'>

                    </div>
                  </div>
                  </div> 
                  
                  
                </div>

          </div>

        }

      </div>
    )
}

export default Battle