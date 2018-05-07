import React, { Component } from 'react'
import SideBar from './SideBar'
import sortBy from 'sort-by'

const foursquare = require('react-foursquare')({
  clientID: 'YJ15513CSIACZFU4G1N520KIDD43IBGLZE3M4A2W200EDUSR',
  clientSecret: 'N31OE0VB2TXGT0GM0E02MBVQ20OJEOWGCCDDOTKUXKSV2T41'
})

class Main extends Component {
    state = {
        mapGoogle: {},
        infoWindow: {},
        markers: [],
        myLocations: require("../JSON/myPlaces.json").myLocations,
        query: 'All',
        images: []
        }

    filterByType = (query) => {

        // if there are markers set in state remove them from the map

        if (this.state.markers) {
            this.state.markers.forEach((e) => {
                e.setMap(null)
            })
        }

        // map trough myLocations array and sey showing boolean based on the query received then return the location

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

        // filter trough my locations and return all locations that are showing (showing boolean is set to true) then map trough them and create markers for them

        let markers = this.state.myLocations.filter((location) => location.showing).map((location) => {

            // deconstruct location so we can have easy access to lat, lng and title

            const {lat, lng, title} = location
            const map = this.state.mapGoogle

            const marker = new window.google.maps.Marker({
                position: {lat, lng},
                map,
                title,
                animation: window.google.maps.Animation.DROP
            })

            // event listeners that animate markers when we move over them

            marker.addListener('mouseover', function() {
                this.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(() => this.setAnimation(null), 400)
            })

            marker.addListener('mouseout', function() {
                this.setAnimation(null)
            })

            // event listener that displays an info window for the clicked marker and animates it

            marker.addListener('click', ()=> {
                this.state.infoWindow.setContent(`
                    <div>
                        <p>${marker.title}</p>
                        <img class="img" src=${this.state.images.filter((image)=>image.title===marker.title)[0].url} alt="image of ${marker.title}"/>
                    </div>`)
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

    // initializes a map using google.maps api and creates an info window then saves them to state

    initMap = () => {
        const mapGoogle = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 45.810000, lng: 15.976318 },
            zoom: (window.innerWidth < 1000 ? 14 : 15),
            mapTypeControl: false
        })
        const infoWindow = new window.google.maps.InfoWindow({
            content: 'contentString'
        })
        this.setState({ mapGoogle, infoWindow })
        this.updateMarkers()
    }

    // initializes the google maps api and fetches images for myLocations using foursquare api and saves them to state

    componentDidMount() {
        window.initMap = this.initMap
        loadMapJS(
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBE4q1RHUOzaCYgbbT8qV27MK9IJurUQF8&callback=initMap"
        )
        let images = []
        this.state.myLocations.forEach((location) => {
            let url = ""
            const arg = { "venue_id": location.venue_id }
            foursquare.venues.getVenuePhotos(arg).then((res) => {
                url = `${res.response.photos.items[0].prefix}${res.response.photos.items[0].height}x${res.response.photos.items[0].width}${res.response.photos.items[0].suffix}`
                images.push({"url": url, "title": location.title})
            }).then(()=> {
                this.setState({ images })
            })
        })
    }

    render() {
        return (
            <div className="container" role="main">
                <div className="map-container">
                    <div id="map" aria-hidden="true" role="application"/>
                </div>
                <SideBar images={ this.state.images } mapGoogle={ this.state.mapGoogle} infoWindow={ this.state.infoWindow } markers={ this.state.markers } showingMarkers={ this.state.myLocations.filter((location) => location.showing).sort(sortBy('title')) } filterByType={ this.filterByType } />
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
