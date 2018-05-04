import React, { Component } from 'react'
import SideBar from './SideBar'
import sortBy from 'sort-by'

class Main extends Component {
    state = {
        mapGoogle: '',
        infoWindow: '',
        markers: [],
        myLocations: require("../JSON/myPlaces.json").myLocations,
        query: 'All'
        }

    filterByType = (query) => {
        if (this.state.markers) {
            this.state.markers.forEach((e) => {
                e.setMap(null)
            })
        }
        const myLocations = this.state.myLocations.map((location) => {
            if ((location.type === query) || (query === 'All')) {
                location.showing = true
            } else {
                location.showing = false
            }
            return location
        })
        this.setState({ myLocations, query })
        this.updateMarkers()
    }

    updateMarkers = () => {
        let markers = this.state.myLocations.filter((location) => location.showing).map((location) => {
            const {lat, lng, title} = location
            const map = this.state.mapGoogle

            const marker = new window.google.maps.Marker({
                position: {lat, lng},
                map,
                title,
                animation: window.google.maps.Animation.DROP
            })

            marker.addListener('mouseover', function() {
                this.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(() => this.setAnimation(null), 400)
            })

            marker.addListener('mouseout', function() {
                this.setAnimation(null)
            })

            marker.addListener('click', ()=> {
                this.state.infoWindow.setContent(title)
                this.state.infoWindow.open(map, marker)
                marker.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(() => {
                    marker.setAnimation(null)
                }, 800)
            })

            return marker
        })
        this.setState({ markers })
    }

    initMap = () => {
        const mapGoogle = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 45.810000, lng: 15.976318 },
            zoom: (16),
            mapTypeControl: false
        })
        const infoWindow = new window.google.maps.InfoWindow({
            content: 'contentString'
        })
        this.setState({ mapGoogle, infoWindow })
        this.updateMarkers()
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
                <SideBar mapGoogle={ this.state.mapGoogle} infoWindow={ this.state.infoWindow } markers={ this.state.markers } showingMarkers={ this.state.myLocations.filter((location) => location.showing).sort(sortBy('title')) } filterByType={ this.filterByType } filterByInput={ this.filterByInput } />
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
