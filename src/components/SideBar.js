import React, { Component } from 'react'
import ListItem from './ListItem'

class SideBar extends Component {
    render() {
        return (
          <div className="side-bar-container">
                <div className="content">
                    <hr/>
                    <h2>Neighborhood Maps</h2>
                    <hr/>
                    <select onChange={(event) => this.props.filterByType(event.target.value) } tabIndex='1' >
                        <option value="All" >Showing All</option>
                        <option value="Restaurant" >Restoraunts</option>
                        <option value="Museum" >Museums</option>
                        <option value="Information" >Information</option>
                        <option value="Sightseeing" >Sightseeing</option>
                        <option value="Transit" >Transit</option>
                        <option value="Entertainment" >Entertainment</option>
                    </select>
                    <hr/>
                    <ul>
                        {
                            this.props.showingMarkers.map((item) => (
                                <ListItem mapGoogle={ this.props.mapGoogle} infoWindow={ this.props.infoWindow } marker={ this.props.markers.filter((marker) => marker.title === item.title)[0] } key={ item.title } item={ item } />
                            ))
                        }
                    </ul>
                </div>}
            </div>
        )
    }
}

export default SideBar
