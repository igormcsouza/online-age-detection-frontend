import React from 'react'
import './styles.css'
import Button from './Button'

const Body = () => (
    <div id='main-body'>
        <div id='section'>
            <h1> Carregar imagem </h1>
            <Button />
        </div>
        <div id='section'>
            <h1> Tirar Foto </h1>
            <Button />
        </div>
    </div>
)

export default Body