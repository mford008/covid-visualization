import React, { Component } from 'react';
import './App.css';

let countries = ['United States of America', 'Spain', 'China', 'Brazil', 'Australia'];

class App extends Component {
  state = {
    data: [],
    displayCountries: [],
  }
  componentDidMount() {
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then(data =>  {
        this.setState({ data: data.Countries })
        this.setState({ displayCountries: (this.state.data).filter(datum => (countries.includes(datum.Country)))})
      })
  }

  addCountry(country) {
    console.log(typeof country);
    this.setState([...this.state.displayCountries, this.state.data[country]])
    console.log(this.state.displayCountries);
  }

  render() {
    return (
      <div className="App">
      <div className="Container">
        <div className="Header">
          <h1 className="Header-content">Data Visualization for COVID-19</h1>
        </div>
        <div className="Selector">
            <label htmlFor="countries">Select Country:</label>
            <select id="countries" onChange={event => this.addCountry(event.target.value)}>
            {(this.state.data).map(datum => (
              <option>
                {datum.Country}
              </option>
            ))
          }
            </select>
        </div>
        <div className="BarChart">
          {(this.state.displayCountries).map(datum => (
            <div className="BarChart-bar" style={{height: (datum.TotalConfirmed / 1000) + "%"}}>
            {datum.CountryCode}
            </div>
            ))
          }
        </div>
      </div>
    </div>
    )
  }
}

export default App;
