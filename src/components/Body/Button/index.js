import React from 'react'
import "./styles.css";

const Button = ({onClick, text}) => (
    <button id="button" onClick={onClick}> {text} </button>
)

export default Button