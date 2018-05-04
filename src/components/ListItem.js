import React, { Component } from 'react'

class ListItem extends Component {
    openMarker = () => {
        this.props.infoWindow.setContent('probaj')
        this.props.infoWindow.open(this.props.mapGoogle, this.props.marker)
        this.props.marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => {
            this.props.marker.setAnimation(null)
        }, 800)
    }
    openMarkerKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.infoWindow.setContent('probaj')
            this.props.infoWindow.open(this.props.mapGoogle, this.props.marker)
            this.props.marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(() => {
                this.props.marker.setAnimation(null)
            }, 800)
        }
    }


    render() {
        return (
            <li onKeyPress={ (event) => this.openMarkerKeyPress(event) } onClick={ this.openMarker } tabIndex="1" className="list-item">
                <p>{ this.props.item.title }</p>
            </li>
        )
    }
}

export default ListItem
