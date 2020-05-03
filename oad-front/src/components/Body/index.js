import React from 'react'
// import FormData from 'form-data'
import Camera from 'react-html5-camera-photo';

import api from '../../services/api'

import './styles.css'
import 'react-html5-camera-photo/build/css/index.css';

import Button from './Button'

export default class Body extends React.Component{
    state = {
        renderCase: '',
        api_response: null
    }

    handleTakePhoto = async (dataUri) => {
        console.log(typeof(dataUri))
        const response = await api.post(
            '/age-detection', { file: dataUri.split("base64,") }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization", 
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
                }
            }
        )

        console.log(response)

        this.setState({
            renderCase: "done",
            age: response.status === '200'? response.data.age: 'Nao foi possivel achar uma idade!',
        })
    }

    renderOnScreen(param){
        switch(param) {
            case 'done':
                return (
                    <div id='main-body'>
                        <div id='section'>
                            <p> Sua Faixa Etaria e [{ this.state.api_response }] anos de idade.</p>
                        </div>
                    </div>
                )
            case 'load':
                return (
                    <h1>UNDER CONSTRUCTION</h1>
                )

            case 'take':
                return (
                    <div id='main-body'>
                        <div id='section'>
                            <Camera
                                onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                            />
                        </div>
                    </div>
                )

            default:
                return (
                    <div id='main-body'>
                        <div id='section'>
                            <h1> Carregar imagem </h1>
                            <Button 
                                onClick={() => {
                                    this.setState({renderCase: "load"})
                                }}
                                text='Carregar Imagens'
                            />
                        </div>
                        <div id='section'>
                            <h1> Tirar Foto </h1>
                            <Button 
                                onClick={() => {
                                    this.setState({renderCase: "take"})
                                }}
                                text='Tirar Foto'
                            />
                        </div>
                    </div>
                )
        }
    }

    render(){
        return (<div>{ this.renderOnScreen(this.state.renderCase) }</div>)
    }
}