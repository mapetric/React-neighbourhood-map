# Neighborhood-Map-React
A single-page web application, built using the React framework, that displays a Google Map of an area and various points of interest. Users can sort trough  all included landmarks and, when selected, additional information about a landmark is presented from the FourSquare APIs.

This application follows the guidelines of [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)

## Features

1. Use the select box to filter the shown locations on the map.
2. Click on the list item to expand the associated marker.
3. Click on a marker to display additional info about the location fetched from the [FourSquare APIs](https://developer.foursquare.com/).

## How to run the project in Development Mode
The project uses [Node.js >= 6.x](https://nodejs.org/en/) and the [Create-React-App starter code](https://github.com/facebookincubator/create-react-app).

After Node is installed in your system, follow the below steps.

1. Navigate to the directory where you want to store the app.
2. Clone the repo `git clone https://github.com/manishbisht/Neighborhood-Map-React.git`
3. Now install all modules listed as dependencies in `package.json` by running the command `npm install`
4. Launch the app with this command `npm start`

A new browser window open automatically displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*
