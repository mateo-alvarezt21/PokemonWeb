import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState("")
  const [selectType, setSelectType] = useState("")
  const [pokemonName, setPokemonName] = useState("")

  const nameTrainer = useSelector(store => store.nameTrainer)
  const handleChangeSelect = (e) =>{
    setSelectType(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setPokemonName(e.target.value)
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=20"}`
    axios.get(URL)
      .then((res) => {
        if(selectType){
          const pokemonByType = res.data.pokemon.map(pokemon => {
            return{
              name: pokemon.name,
              url: pokemon.url
            }
          })
          setPokemons(pokemonByType)
        }else{
          setPokemons(res.data.results)
        }
      })
      .catch((err) => console.log(err))
  }, [selectType])

  useEffect(() => {
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase))
    setPokemonsFilter(pokemonByName)
  }, [pokemonName, pokemons])
  

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/"
    axios.get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err))
  }, [])
  
  

  return (
    <main>
      <p>Welcome, {nameTrainer}, here you can find your favorite pokemon</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id='pokemonName' placeholder='search your pokemon'/>
          <button>Search</button>
        </div>
        <select onChange={handleChangeSelect}>
          <option value="">All</option>
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
      <section>
        {
          pokemons.map(pokemon => (
            <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>
          ))
        }
      </section>
    </main>
  )
}

export default Pokedex