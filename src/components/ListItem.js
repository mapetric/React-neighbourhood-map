import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListItem extends Component {

    // when the list item is clicked or enter is pressed when the item is focued open the info windows and animate the marker for the list item

    openMarker = () => {
        this.props.mapGoogle.panTo(this.props.marker.getPosition());
        this.props.infoWindow.setContent(
            `<div tabIndex="1" name=${ this.props.marker.title }>
                <p>${this.props.marker.title}</p>
                <img class="img" src=${this.props.images.filter((image)=>image.title===this.props.marker.title)[0].url} alt="image of ${this.props.marker.title}"/>
                <p>image by <a tabIndex="1" href="https://foursquare.com/">FOURSQUARE</a></p>
            </div>`
        )
        this.props.infoWindow.open(this.props.mapGoogle, this.props.marker)
        this.props.marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => {
            this.props.marker.setAnimation(null)
        }, 800)
    }
    openMarkerKeyPress = (event) => {
        this.props.mapGoogle.panTo(this.props.marker.getPosition());
        if (event.key === 'Enter') {
            this.props.infoWindow.setContent(
                `<div tabIndex="1" name=${ this.props.marker.title }>
                    <p>${this.props.marker.title}</p>
                    <img class="img" src=${this.props.images.filter((image)=>image.title===this.props.marker.title)[0].url} alt="image of ${this.props.marker.title}"/>
                    <p>image by <a tabIndex="1" href="https://foursquare.com/">FOURSQUARE</a></p>
                </div>`
            )
            this.props.infoWindow.open(this.props.mapGoogle, this.props.marker)
            this.props.marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(() => {
                this.props.marker.setAnimation(null)
            }, 800)
        }
    }

    render() {
        return (
            <li onKeyPress={ (event) => this.openMarkerKeyPress(event) } onClick={ this.openMarker } tabIndex="2" className="list-item">
                <p>{ this.props.item.title }</p>
            </li>
        )
    }
}

ListItem.propTypes = {
    images: PropTypes.array.isRequired,
    mapGoogle: PropTypes.object.isRequired,
    infoWindow: PropTypes.object.isRequired,
    marker: PropTypes.object,
    item: PropTypes.object.isRequired
}

export default ListItem
