import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "/src/components/pokedex/styles/Pokemon.css"

const Pokemon = () => {

  const [pokemon, setPokemon] = useState()

  const {id} = useParams()
  

  const getPercentBar = (stat) =>{
    const percent = (stat * 100) / 255 
    return `${percent}%`
  
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
  }, [])
  


  return (
    //parte superior
    <main className='pokemon__main'>
      <div className="contenedor">
        <section className='pokemon__firstsection'>
          <section>
            <div className='pokemon__imgdiv'>
              <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
          </section>
        </section>
    
          <div className="segunda-parte">
            <h2 className='pokemon__id'># {pokemon?.id}</h2>
            <h2 className='pokemon__name'>{pokemon?.name}</h2>
            <div className='pokemon__stats1'>
              <div className='pokemon__wh'>
                <h4>{pokemon?.weight}</h4>
                <h5>Weight</h5>
        
              </div>
              <div className='pokemon__wh'>
                <h4>{pokemon?.height}</h4>
                <h5>Height</h5>
        
              </div>
            </div>
            <div className='pokemon__stats2'>
              <div className='pokemon__ht'>
                <h3>Type</h3>
                <div className='pokemon__div'>
                  {
                    pokemon?.types.map(type => <div className={`pokemon__type  bg-lg-${type.type.name} `} key={type.type.name}><span>{type.type.name}</span></div>)
                  }
                </div>
              </div>
              <div className='pokemon__ht'>
                <h3>Habilities</h3>
                <div className='pokemon__div-habi'>
                  {
                    pokemon?.abilities.map(ability => <div key={ability.ability.name}><span>{ability.ability.name}</span></div>  )
                  }
                </div>
              </div>
            </div>
          </div>
      </div>

        <section className='pokemon__stats'>
          <h2 className='pokemon__stats-title'>Stats </h2>
          <section className='pokemon__stats-info' >

              {
                pokemon?.stats.map(stat => (
                  <article className='pokemon__stat' key={stat.stat.name}>
                  <div className='pokemon__stat-header'>
                    <h4 className='pokemon__stat-name'>{stat.stat.name}</h4>
                    <h5 className='pokemon__stat-value'>{stat.base_stat}/255</h5>
                  </div>
                  <div className='pokemon__stat-bar'>
                    <div className='pokemon__stat-barGray'>
                      <div className='pokemon__stat-barProgress' style={{width: getPercentBar(stat.base_stat)}} ></div>
                    </div>
                  </div>
                </article>
                ))
              }
  
          </section>
        </section>

  
    </main>

    
  )
}

export default Pokemon