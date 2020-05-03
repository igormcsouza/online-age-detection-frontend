import React from 'react'
import './styles.css'
import Button from './Button'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default class Body extends React.Component{
    state = {
        renderCase: ''
    }

    handleTakePhoto (dataUri) {
        // Do stuff with the photo...
        console.log(dataUri);
    }

    renderOnScreen(param){
        switch(param) {
            case 'load':
                return <p>LOAD</p>

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