import React, { Component } from 'react'

// hamburger icon heavily inspired by https://codepen.io/designcouch/pen/Atyop

class Hamburger extends Component {

        // take care of opening and closing the side bar on click or keypress

        transform = () => {
            const hamburger = document.getElementById('nav-icon1')
            const content = document.getElementsByClassName('content')[0]
            const mapContainer = document.getElementsByClassName('map-container')[0]
            const sideBar = document.getElementsByClassName('side-bar-container')[0]
            if (hamburger.classList.contains("open")) {
                content.style.display = 'none'
                sideBar.style.width = '54px'
                mapContainer.style.width = 'calc(100% - 54px)'
            } else {
                content.style.display = 'flex'
                sideBar.style.width = '304px'
                mapContainer.style.width = 'calc(100% - 304px)'
            }
            hamburger.classList.toggle('open')
        }
        transformKeyPress = (event) => {
            if (event.key === 'Enter') {
                const hamburger = document.getElementById('nav-icon1')
                const content = document.getElementsByClassName('content')[0]
                const mapContainer = document.getElementsByClassName('map-container')[0]
                const sideBar = document.getElementsByClassName('side-bar-container')[0]
                if (hamburger.classList.contains("open")) {
                    content.style.display = 'none'
                    sideBar.style.width = '54px'
                    mapContainer.style.width = 'calc(100% - 54px)'
                } else {
                    content.style.display = 'flex'
                    sideBar.style.width = '304px'
                    mapContainer.style.width = 'calc(100% - 304px)'
                }
                hamburger.classList.toggle('open')
            }
        }

      render() {
            return (
                <div className="hamburger-container">
                    <div onKeyPress={ (event) => this.transformKeyPress(event) } onClick={this.transform} id="nav-icon1" className="open" tabIndex="1">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            );
      }
}

export default Hamburger
