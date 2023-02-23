import React from 'react'
import {useDispatch} from "react-redux"
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'
import "/src/components/pokedex/styles/Home.css"

const Home = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainerGlobal(nameTrainer)) 
    }
return (
    <main className='home__container'>
        <section className='home'>
            <div className='home__img'>
                <img src='/images/pokeball.png'></img>
            </div>
            <h2 className='home__title'>Hello trainer!</h2>
            <p className='home__p'>Give me your name to start!</p>
            <form className='home__form' onSubmit={handleSubmit}>
                <input required id='nameTrainer' type="text" placeholder='your name...'/>
                <button className='home__btn'><i className='bx bx-chevron-right'></i></button>
            </form>
        </section>
    </main>
)
}

export default Home