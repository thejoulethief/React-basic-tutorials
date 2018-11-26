import React, { Component } from 'react';
import './App.css';
import Flat from './components/flat.js'
import GoogleMapReact from 'google-map-react';

import Marker from './components/marker.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      search: "",
      allFlats: []
    };
  }

  componentDidMount() {
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({ flats: data, allFlats: data });
      })
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    });

  }


  render() {

    const center = {
      lat: 12.9716,
      lng: 77.5946
    }

    return (
      <div className="App">
        <div className="main">
          <div className="search">
            <input type="text" placeholder="Search" value={this.state.search} onChange={this.handleSearch}></input>
          </div>
          <div className="flats">
            {
              this.state.flats.map((flat) => {
                return <Flat key={flat.name} flat={flat} />;
              })
            }
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            center={center}
            zoom={15}
          />
          {
            this.state.flats.map((flat) => {
              return <Marker key={flat.name} lat={flat.lat} lng={flat.lng} text={this.state.flats.price} />;
            })
          };
        </div>
      </div>
    );
  }
}

export default App;
