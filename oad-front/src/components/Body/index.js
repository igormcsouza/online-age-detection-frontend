import React from 'react'
import FormData from 'form-data'
import Camera from 'react-html5-camera-photo';

import api from '../../services/api'

import './styles.css'
import 'react-html5-camera-photo/build/css/index.css';

import Button from './Button'
import Image from './Image'

export default class Body extends React.Component{
    state = {
        renderCase: '',
        age: null,
        image: 'No image yet'
    }

    handleTakePhoto = async (dataUri) => {
        console.log(dataUri)
        const response = await api.post(
            '/age-detection', { file: dataUri }, {
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

    handleLoadPhoto = async (fileLoaded) => {
        let formdata = new FormData()
        formdata.append('file', fileLoaded.target.files[0])

        const response = await api.post(
            '/age-detection', 
            formdata, 
            {
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
            age: response.data.age,
            image: response.data.image
        })
    }

    renderOnScreen(param){
        switch(param) {
            case 'done':
                return (
                    <div id='main-body'>
                        <div id='section'>
                            <h1> Sua Faixa Etaria e { this.state.age } anos de idade.</h1>
                        </div>
                        <div id='section'>
                            <Image data={this.state.image}/>
                            <Button 
                                onClick={() => {
                                    this.setState({renderCase: ""})
                                }}
                                text='Voltar'
                            />
                        </div>
                    </div>
                )
            case 'load':
                return (
                    <div id='main-body'>
                        <div id='section'>
                            <input 
                                type="file" 
                                accept="image/*" 
                                capture 
                                onChange={ (fileLoaded) => { this.handleLoadPhoto(fileLoaded) } } 
                            />
                        </div>
                    </div>
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