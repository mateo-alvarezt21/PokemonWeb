import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'
import "/src/components/pokedex/styles/Pokedex.css"

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [selectType, setSelectType] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
 console.log(currentPage)
  const nameTrainer = useSelector(store => store.nameTrainer)
  const handleChangeSelect = (e) =>{
    setSelectType(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const paginationLogic = () =>{
    //cantidad de pokemon por paginas
    const pokemonPerPage = 12
    //pokemon que se van a mostrar en la pagina actual

    const sliceStart = (currentPage - 1) * pokemonPerPage
    const sliceEnd = sliceStart + pokemonPerPage
    const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd)

    //Ultima pagina
    const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1

    //Bloque actual
    const pagesPerBlock = 5
    const actualBlock = Math.ceil(currentPage / pagesPerBlock)

    //paginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock * pagesPerBlock - pagesPerBlock) + 1
    const maxPage = actualBlock * pagesPerBlock
    for (let i = minPage; i <= maxPage; i++){
      if(i <= lastPage){
        pagesInBlock.push(i)
      }
    }

    return {pagesInBlock, lastPage, pokemonsInPage}
  }

  const {pagesInBlock, lastPage, pokemonsInPage} = paginationLogic()

  const handleNextPage = () => {
    const newPage = currentPage + 1
    if(newPage > lastPage){
      setCurrentPage(1)
    } else{
      setCurrentPage(newPage)
    }
  }

  const handlePreviusPage = () =>{
    const newPage = currentPage - 1
    if(newPage < 1){
      setCurrentPage(lastPage)
    }else{
      setCurrentPage(newPage)
    }
  }

  
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=1279"}`
    axios.get(URL)
      .then((res) => {
        if(selectType){
          const pokemonByType = res.data.pokemon.map(pokemon => {
            return{
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url
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
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))

    setPokemonsFilter(pokemonByName)
  }, [pokemonName, pokemons])
  

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/"
    axios.get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemons])
  

  

  return (
    <main className='pokedex__container'>
      <p className='pokedex__welcome'>Welcome,<span> {nameTrainer}</span>, here you can find your favorite pokemon</p>
      <form className='pokedex__form' onSubmit={handleSubmit}>
        <div>
          <input className='pokedex__input' type="text" id='pokemonName' placeholder='search your pokemon'/>
          <button className='pokedex__btn'><i className='bx bx-chevron-right'></i></button>
        </div>
        <select className='pokedex__select' onChange={handleChangeSelect}>
          <option className='pokedex__option' value="">All</option>
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
        
      </form>
      <section className='pokedex__section'>
        {
          pokemonsInPage.map(pokemon => (
            <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>
          ))
        }
      </section>
      <section className='pokedex__pages'>
        <ul className='pokedex__pages-ul'>
          <li onClick={handlePreviusPage}><i className='icon bx bxs-chevrons-left' ></i></li>
          <li  onClick={() => setCurrentPage(1)}> ... </li>
          {
            pagesInBlock.map(page => <li className='icon3' onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
          }
          <li className='icon2' onClick={() => setCurrentPage(lastPage)}> ... </li>
          <li onClick={handleNextPage}><i className='icon bx bxs-chevrons-right' ></i></li>
        </ul>
        
      </section>
    </main>
  )
}

export default Pokedex