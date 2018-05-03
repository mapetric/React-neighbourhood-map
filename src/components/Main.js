import React, { Component } from 'react'

class Main extends Component {
    state = {
        map: '',
        infoWindow: ''
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 45.810000, lng: 15.976318 },
            zoom: (16),
            mapTypeControl: false
        })
        const infoWindow = new window.google.maps.InfoWindow({
            content: 'contentString'
        })
        this.setState({ map, infoWindow })
    }

    componentDidMount() {
        window.initMap = this.initMap
        loadMapJS(
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBE4q1RHUOzaCYgbbT8qV27MK9IJurUQF8&callback=initMap"
        )
    }

    render() {
        return (
            <div className="container">
                <div className="map-container">
                    <div id="map" />
                </div>
                {/* placeholder*/}
                <div className="sidebar">
                </div>
            </div>
        )
    }
}

export default Main

function loadMapJS(src) {
    const ref = window.document.getElementsByTagName("script")[0]
    const script = window.document.createElement("script")
    script.src = src
    script.async = true
    script.onerror = () => {
        document.write("Google Maps can't be loaded")
    }
    ref.parentNode.insertBefore(script, ref)
}
