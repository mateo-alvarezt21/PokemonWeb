import React from 'react'
import { useDispatch } from 'react-redux'
import { LogOut } from '../../store/slices/nameTrainer.slice'
import "/src/components/pokedex/styles/Header.css"

const Header = () => {

    const dispatch = useDispatch()

    const handleClickLogOut = () =>{
        dispatch(LogOut())
    }

return (
    <header className='header'>
        <div className='header__red'>
            <div className='header__img'>
                <img src="/images/poketitle.png" alt="" />
            </div>
        </div>
        <div className='header__black'>
            <div className='header__pokeball'>
                <button className='header__btn' onClick={handleClickLogOut}><i className='bx bxs-exit'></i></button>
            </div>
        </div>
    </header>
)
}

export default Header